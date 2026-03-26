"""
URL Risk Classifier
Combines structural heuristics, domain age (WHOIS), and redirect
chain analysis to produce a 0–100 risk score for any given URL.
"""

from __future__ import annotations
import re
import socket
from datetime import datetime, timezone
from typing import Any
from urllib.parse import urlparse

import requests
import tldextract

# --------------------------------------------------------------------------- #
# Config
# --------------------------------------------------------------------------- #

REQUEST_TIMEOUT = 6       # seconds for HTTP head requests
WHOIS_TIMEOUT   = 8       # seconds for WHOIS lookups
NEW_DOMAIN_DAYS = 180     # domains younger than this are suspicious

SUSPICIOUS_TLDS = {
    ".tk", ".ml", ".ga", ".cf", ".gq",           # free / abused TLDs
    ".xyz", ".top", ".club", ".online", ".site",
    ".info", ".biz",
}

URL_SHORTENERS = {
    "bit.ly", "tinyurl.com", "t.co", "goo.gl", "ow.ly",
    "is.gd", "buff.ly", "rebrand.ly", "short.io",
}

BRAND_KEYWORDS = [
    "paypal", "amazon", "netflix", "apple", "microsoft",
    "google", "facebook", "instagram", "whatsapp", "bank",
    "secure", "login", "verify", "account", "update",
]

# --------------------------------------------------------------------------- #
# Helpers
# --------------------------------------------------------------------------- #

def _parse(url: str) -> urlparse:
    if not url.startswith(("http://", "https://")):
        url = "http://" + url
    return urlparse(url)


def _extracted(url: str) -> tldextract.Result:
    return tldextract.extract(url)


def _heuristic_flags(url: str) -> list[str]:
    flags: list[str] = []
    parsed = _parse(url)
    ext = _extracted(url)
    hostname = parsed.hostname or ""
    path = parsed.path.lower()

    # IP address instead of domain
    try:
        socket.inet_aton(hostname)
        flags.append("IP address used instead of domain name")
    except (socket.error, TypeError):
        pass

    # Excess subdomains (e.g. secure.login.paypal.fake.com)
    subdomain_parts = ext.subdomain.split(".") if ext.subdomain else []
    if len(subdomain_parts) >= 3:
        flags.append("Excessive subdomain depth")

    # Brand name in subdomain but not the registered domain
    for brand in BRAND_KEYWORDS:
        if brand in ext.subdomain.lower() and brand not in ext.domain.lower():
            flags.append(f"Brand name '{brand}' impersonated in subdomain")
            break

    # Suspicious TLD
    tld = f".{ext.suffix}"
    if tld in SUSPICIOUS_TLDS:
        flags.append(f"High-risk TLD: {tld}")

    # URL shortener
    if f"{ext.domain}.{ext.suffix}" in URL_SHORTENERS:
        flags.append("URL shortener detected — destination unknown")

    # Excessive length (>100 chars is suspicious)
    if len(url) > 100:
        flags.append("Unusually long URL")

    # Encoded characters / obfuscation
    if url.count("%") > 3:
        flags.append("Heavy URL encoding / obfuscation")

    # HTTP (not HTTPS)
    if parsed.scheme == "http":
        flags.append("No HTTPS — unencrypted connection")

    # Sensitive path keywords
    for kw in ["login", "signin", "verify", "update", "secure", "password"]:
        if kw in path:
            flags.append(f"Sensitive keyword in URL path: '{kw}'")
            break

    return flags


def _domain_age_days(domain: str) -> int | None:
    """Returns domain age in days, or None if WHOIS fails."""
    try:
        import whois  # python-whois
        w = whois.whois(domain)
        creation = w.creation_date
        if isinstance(creation, list):
            creation = creation[0]
        if creation is None:
            return None
        if creation.tzinfo is None:
            creation = creation.replace(tzinfo=timezone.utc)
        age = (datetime.now(timezone.utc) - creation).days
        return max(age, 0)
    except Exception:
        return None


def _follow_redirects(url: str) -> tuple[str, int]:
    """Returns (final_url, number_of_redirects)."""
    try:
        resp = requests.get(
            url, allow_redirects=True,
            timeout=REQUEST_TIMEOUT,
            headers={"User-Agent": "Mozilla/5.0"}
        )
        history_count = len(resp.history)
        return resp.url, history_count
    except Exception:
        return url, 0


# --------------------------------------------------------------------------- #
# Scoring
# --------------------------------------------------------------------------- #

def _compute_score(flags: list[str], age_days: int | None, redirects: int) -> float:
    score = 0.0

    # Each flag contributes up to a weighted chunk (cap raised to 0.80)
    flag_weight = min(len(flags) * 0.15, 0.80)
    score += flag_weight

    # Critical combo bonuses — these combos are near-certain phishing patterns
    has_brand    = any("impersonated" in f for f in flags)
    has_sus_tld  = any("High-risk TLD" in f for f in flags)
    has_no_https = any("HTTPS" in f for f in flags)
    has_ip       = any("IP address" in f for f in flags)
    has_shortener = any("shortener" in f for f in flags)

    if has_brand and has_sus_tld:
        score += 0.15   # brand spoof on a free/abused TLD = strong phishing signal
    if has_brand and has_no_https:
        score += 0.05   # impersonating a brand over plain HTTP
    if has_ip and has_no_https:
        score += 0.10   # raw IP + no encryption = very suspicious

    # Young domain
    if age_days is not None:
        if age_days < 30:
            score += 0.25
        elif age_days < NEW_DOMAIN_DAYS:
            score += 0.10

    # Suspicious redirect chain
    if redirects >= 3:
        score += 0.15
    elif redirects >= 1:
        score += 0.05

    # URL shortener alone is medium risk — bump it up
    if has_shortener:
        score += 0.10

    return round(min(score, 1.0), 4)


def _risk_label(score: float) -> str:
    if score >= 0.75:
        return "HIGH"
    if score >= 0.45:
        return "MEDIUM"
    return "LOW"


# --------------------------------------------------------------------------- #
# Public interface
# --------------------------------------------------------------------------- #

class UrlClassifier:
    def analyze_url(self, url: str) -> dict[str, Any]:
        if not url or not url.strip():
            return {"error": "No URL provided.", "risk_score": 0}

        url = url.strip()

        # Structural heuristics (fast, no network)
        flags = _heuristic_flags(url)

        # Domain age via WHOIS (may take a few seconds)
        ext = _extracted(url)
        registered_domain = f"{ext.domain}.{ext.suffix}"
        age_days = _domain_age_days(registered_domain)

        # Redirect chain (network call)
        final_url, redirect_count = _follow_redirects(url)
        if final_url != url:
            final_ext = _extracted(final_url)
            if f"{final_ext.domain}.{final_ext.suffix}" != registered_domain:
                flags.append(f"Redirects to a different domain: {final_url[:80]}")

        score = _compute_score(flags, age_days, redirect_count)
        risk_pct = round(score * 100, 1)

        return {
            "risk_score": risk_pct,
            "risk_level": _risk_label(score),
            "domain": registered_domain,
            "domain_age_days": age_days,
            "redirect_count": redirect_count,
            "final_url": final_url,
            "flags": flags,
            "flag_count": len(flags),
            "explanation": _build_explanation(risk_pct, flags, age_days),
        }


def _build_explanation(score: float, flags: list[str], age: int | None) -> str:
    if score >= 75:
        base = "This URL has multiple high-risk characteristics consistent with phishing or malware distribution."
    elif score >= 45:
        base = "This URL has some suspicious characteristics — proceed with caution."
    else:
        base = "This URL appears relatively safe, but always exercise caution with unknown links."

    if flags:
        base += f" Issues found: {'; '.join(flags[:3])}."
    if age is not None and age < NEW_DOMAIN_DAYS:
        base += f" Domain is only {age} days old."
    return base


# Singleton used by main.py
url_classifier_instance = UrlClassifier()