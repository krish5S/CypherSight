"""
Deepfake / Manipulated Image Detector
Uses a multi-signal heuristic approach without requiring a GPU or large
model download:
  1. EXIF metadata analysis
  2. Error Level Analysis (ELA) — detects re-compression artifacts
  3. Noise consistency analysis
  4. Image statistics (skin-tone saturation anomalies, etc.)

A CNN-based model can be plugged in later by replacing / supplementing
the _model_score() stub.
"""

from __future__ import annotations
import base64
import io
import math
import os
import tempfile
from typing import Any

import numpy as np
from PIL import Image, ImageChops, ImageEnhance, ExifTags


# --------------------------------------------------------------------------- #
# Config
# --------------------------------------------------------------------------- #

ELA_QUALITY   = 90     # JPEG re-save quality for ELA
ELA_THRESHOLD = 12.0   # Mean ELA pixel value above this = suspicious
NOISE_THRESHOLD = 18.0 # Laplacian variance below this = over-smoothed (GAN artifact)


# --------------------------------------------------------------------------- #
# Helpers
# --------------------------------------------------------------------------- #

def _load_image(source: str) -> Image.Image:
    """
    Accepts:
      - A local file path
      - A base64-encoded string (with or without data URI prefix)
      - A URL (requires `requests`)
    """
    # Base64
    if source.startswith("data:image") or _looks_like_base64(source):
        if "," in source:
            source = source.split(",", 1)[1]
        img_bytes = base64.b64decode(source)
        return Image.open(io.BytesIO(img_bytes)).convert("RGB")

    # URL
    if source.startswith(("http://", "https://")):
        import requests
        resp = requests.get(source, timeout=10)
        resp.raise_for_status()
        return Image.open(io.BytesIO(resp.content)).convert("RGB")

    # Local file
    return Image.open(source).convert("RGB")


def _looks_like_base64(s: str) -> bool:
    if len(s) < 100:
        return False
    try:
        base64.b64decode(s[:100], validate=True)
        return True
    except Exception:
        return False


# --------------------------------------------------------------------------- #
# Signal 1 — EXIF metadata
# --------------------------------------------------------------------------- #

def _analyze_exif(img: Image.Image) -> tuple[float, list[str]]:
    flags: list[str] = []
    score = 0.0

    raw_exif = img._getexif() if hasattr(img, "_getexif") else None
    if raw_exif is None:
        flags.append("No EXIF metadata — image may have been stripped or generated")
        score += 0.15
        return score, flags

    exif = {ExifTags.TAGS.get(k, k): v for k, v in raw_exif.items()}

    # Software field is a strong signal for AI generation
    software = str(exif.get("Software", "")).lower()
    for kw in ["stable diffusion", "midjourney", "dall-e", "photoshop", "gimp", "firefly"]:
        if kw in software:
            flags.append(f"Image editing/generation software detected: {software[:60]}")
            score += 0.35
            break

    # Mismatched date fields
    dt_orig = exif.get("DateTimeOriginal")
    dt_mod  = exif.get("DateTime")
    if dt_orig and dt_mod and dt_orig != dt_mod:
        flags.append("Metadata timestamps are inconsistent (possible post-edit)")
        score += 0.10

    # No camera make/model in an image claiming to be a photo
    if not exif.get("Make") and not exif.get("Model"):
        flags.append("No camera make/model in EXIF")
        score += 0.10

    return min(score, 0.50), flags


# --------------------------------------------------------------------------- #
# Signal 2 — Error Level Analysis (ELA)
# --------------------------------------------------------------------------- #

def _ela_score(img: Image.Image) -> tuple[float, list[str]]:
    """
    Saves the image at a known JPEG quality, then measures the difference
    from the original. Heavily re-compressed areas (spliced regions) show
    higher error levels.
    """
    flags: list[str] = []

    with tempfile.NamedTemporaryFile(suffix=".jpg", delete=False) as tmp:
        tmp_path = tmp.name

    try:
        img.save(tmp_path, "JPEG", quality=ELA_QUALITY)
        resaved = Image.open(tmp_path).convert("RGB")
        ela_img = ImageChops.difference(img, resaved)

        ela_arr = np.array(ela_img, dtype=np.float32)
        mean_ela = float(ela_arr.mean())
        max_ela  = float(ela_arr.max())

        score = 0.0
        if mean_ela > ELA_THRESHOLD:
            flags.append(
                f"High ELA value ({mean_ela:.1f}) — possible image splicing or heavy manipulation"
            )
            score = min((mean_ela - ELA_THRESHOLD) / 30.0, 0.40)
    finally:
        os.unlink(tmp_path)

    return score, flags


# --------------------------------------------------------------------------- #
# Signal 3 — Noise / texture consistency
# --------------------------------------------------------------------------- #

def _noise_score(img: Image.Image) -> tuple[float, list[str]]:
    """
    GAN-generated images are often over-smooth in flat regions.
    We measure local variance using a Laplacian-like kernel.
    """
    flags: list[str] = []

    gray = np.array(img.convert("L"), dtype=np.float32)

    # Laplacian variance — low = over-smooth = GAN-like
    kernel = np.array([[0,  1, 0],
                       [1, -4, 1],
                       [0,  1, 0]], dtype=np.float32)

    from scipy.signal import convolve2d
    lap = convolve2d(gray, kernel, mode="valid")
    lap_var = float(np.var(lap))

    score = 0.0
    if lap_var < NOISE_THRESHOLD:
        flags.append(
            f"Unusually low texture variance ({lap_var:.1f}) — consistent with AI generation or heavy smoothing"
        )
        score = 0.25

    return score, flags


# --------------------------------------------------------------------------- #
# Signal 4 — Colour / saturation anomalies
# --------------------------------------------------------------------------- #

def _color_score(img: Image.Image) -> tuple[float, list[str]]:
    flags: list[str] = []
    score = 0.0

    arr = np.array(img, dtype=np.float32) / 255.0
    # Check for uniform saturation across the whole image (GAN artefact)
    hsv = np.array(img.convert("HSV")) if hasattr(img, "convert") else None
    try:
        hsv_arr = np.array(img.convert("HSV"), dtype=np.float32)
        sat_std = float(hsv_arr[:, :, 1].std())
        if sat_std < 10:
            flags.append("Very uniform saturation — possible AI-generated image")
            score += 0.15
    except Exception:
        pass

    return score, flags


# --------------------------------------------------------------------------- #
# Optional: stub for a future CNN model
# --------------------------------------------------------------------------- #

def _model_score(img: Image.Image) -> float:
    """
    Placeholder for a fine-tuned CNN deepfake detector.
    Return 0.0 until a real model is integrated.
    To integrate:
      1. pip install timm  (or torchvision)
      2. Load a model trained on FaceForensics++ or similar dataset
      3. Pre-process `img` and return the model's deepfake probability
    """
    return 0.0


# --------------------------------------------------------------------------- #
# Scoring & public interface
# --------------------------------------------------------------------------- #

def _risk_label(score: float) -> str:
    if score >= 0.70:
        return "HIGH"
    if score >= 0.40:
        return "MEDIUM"
    return "LOW"


class DeepfakeDetector:
    def analyze_image(self, media_reference: str) -> dict[str, Any]:
        try:
            img = _load_image(media_reference)
        except Exception as exc:
            return {"error": f"Could not load image: {exc}", "risk_score": 0}

        # Run all signals
        exif_score,  exif_flags  = _analyze_exif(img)
        ela_score,   ela_flags   = _ela_score(img)
        noise_score, noise_flags = _noise_score(img)
        color_score, color_flags = _color_score(img)
        model_prob               = _model_score(img)

        all_flags = exif_flags + ela_flags + noise_flags + color_flags

        # Weighted blend (model gets priority when it's implemented)
        if model_prob > 0:
            combined = model_prob * 0.50 + (exif_score + ela_score + noise_score + color_score) * 0.50
        else:
            combined = exif_score + ela_score + noise_score + color_score

        final_score = round(min(combined, 1.0), 4)
        risk_pct = round(final_score * 100, 1)

        return {
            "risk_score": risk_pct,
            "risk_level": _risk_label(final_score),
            "signals": {
                "exif":  {"score": round(exif_score * 100), "flags": exif_flags},
                "ela":   {"score": round(ela_score * 100),  "flags": ela_flags},
                "noise": {"score": round(noise_score * 100),"flags": noise_flags},
                "color": {"score": round(color_score * 100),"flags": color_flags},
            },
            "all_flags": all_flags,
            "flag_count": len(all_flags),
            "image_size": list(img.size),
            "explanation": _build_explanation(risk_pct, all_flags),
        }


def _build_explanation(score: float, flags: list[str]) -> str:
    if score >= 70:
        base = "This image shows strong signs of digital manipulation or AI generation."
    elif score >= 40:
        base = "This image has some anomalies that may indicate manipulation."
    else:
        base = "No significant manipulation was detected in this image."

    if flags:
        base += f" Key findings: {flags[0]}."
    return base


# Singleton used by main.py
deepfake_detector_instance = DeepfakeDetector()
