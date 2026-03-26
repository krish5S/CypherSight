"""
Phishing / Scam Message Detector
Uses a lightweight HuggingFace zero-shot classification model to score
messages for phishing, urgency manipulation, and social engineering.
"""

from __future__ import annotations
import re
from typing import Any

# Lazy-loaded to avoid slowing down server startup
_pipeline = None

# More descriptive labels give the zero-shot model better signal
SCAM_LABELS = [
    "phishing attack, scam, fraud, urgent account warning",
    "normal friendly conversation or business communication",
]

# High-signal keywords that boost the risk score
URGENCY_PATTERNS = [
    r"\burgent\b", r"\bimmediately\b", r"\bact now\b", r"\blimited time\b",
    r"\bverify your account\b", r"\bsuspended\b", r"\bclick here\b",
    r"\bclaim your (prize|reward|gift)\b", r"\byou (have been|are) selected\b",
    r"\bfree (money|gift|iphone|ipad)\b", r"\bwon\b.*\blottery\b",
    r"\botp\b", r"\bpassword\b.*\bexpir", r"\bcongratulations\b",
    r"\bwire transfer\b", r"\bbitcoin\b", r"\bgift card\b",
    r"\byour (account|card|bank) (has been|is|was)\b",
    r"\bdo not share\b", r"\bnever share\b", r"\bconfidential\b",
]

SAFE_PATTERNS = [
    r"\bmeeting\b", r"\bschedule\b", r"\bthank you\b", r"\bregards\b",
    r"\binvoice attached\b", r"\bplease find\b",
]


def _get_pipeline():
    global _pipeline
    if _pipeline is None:
        from transformers import pipeline
        _pipeline = pipeline(
            "zero-shot-classification",
            model="facebook/bart-large-mnli",
            device=-1,  # CPU; change to 0 if you have a GPU
        )
    return _pipeline


def _keyword_score(text: str) -> tuple[float, list[str]]:
    """Returns a 0-1 heuristic boost and the matched signals."""
    text_lower = text.lower()
    hits: list[str] = []

    for pattern in URGENCY_PATTERNS:
        if re.search(pattern, text_lower):
            hits.append(pattern.strip(r"\b"))

    # Slight reduction for clearly benign language
    safe_hits = sum(1 for p in SAFE_PATTERNS if re.search(p, text_lower))

    raw = min(len(hits) * 0.15, 0.75)      # each signal worth 15%, cap at 75%
    adjusted = max(0.0, raw - safe_hits * 0.05)
    return adjusted, hits


def _blend_scores(model_score: float, keyword_boost: float, signal_count: int) -> float:
    """
    Adaptive blend:
    - When many keywords fire (>=4), trust keywords more than the model
      because the model is general-purpose, not phishing-specific.
    - When no keywords fire, lean on the model.
    """
    if signal_count >= 4:
        # Heavy keyword evidence - 30% model, 70% keywords
        blended = model_score * 0.30 + keyword_boost * 0.70
    elif signal_count >= 2:
        # Split evenly
        blended = model_score * 0.50 + keyword_boost * 0.50
    else:
        # No strong keyword signal - trust model more
        blended = model_score * 0.70 + keyword_boost * 0.30

    return round(min(1.0, blended), 4)


def _risk_label(score: float) -> str:
    if score >= 0.75:
        return "HIGH"
    if score >= 0.45:
        return "MEDIUM"
    return "LOW"


class PhishingDetector:
    def analyze_message(self, text: str) -> dict[str, Any]:
        if not text or not text.strip():
            return {"error": "Empty message provided.", "risk_score": 0}

        # --- Keyword heuristics (fast, run first) ---
        kw_boost, matched_signals = _keyword_score(text)

        # --- Model inference ---
        pipe = _get_pipeline()
        result = pipe(text[:512], candidate_labels=SCAM_LABELS)

        label_scores: dict[str, float] = dict(zip(result["labels"], result["scores"]))
        # Pick the score for whichever label starts with "phishing"
        model_phishing_score = next(
            (v for k, v in label_scores.items() if k.startswith("phishing")), 0.0
        )

        # --- Adaptive blend ---
        final_score = _blend_scores(model_phishing_score, kw_boost, len(matched_signals))
        risk_pct = round(final_score * 100, 1)

        return {
            "risk_score": risk_pct,
            "risk_level": _risk_label(final_score),
            "model_confidence": round(model_phishing_score * 100, 1),
            "signals_detected": matched_signals,
            "signal_count": len(matched_signals),
            "explanation": _build_explanation(risk_pct, matched_signals),
        }


def _build_explanation(score: float, signals: list[str]) -> str:
    if score >= 75:
        base = "This message shows strong indicators of a phishing or scam attempt."
    elif score >= 45:
        base = "This message contains some suspicious patterns and should be treated with caution."
    else:
        base = "This message appears to be legitimate."

    if signals:
        signal_str = ", ".join(
            s.replace(r"\b", "").replace("\\", "") for s in signals[:4]
        )
        base += f" Detected signals: {signal_str}."

    return base


# Singleton used by main.py
phishing_detector_instance = PhishingDetector()