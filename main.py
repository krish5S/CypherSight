from os import getenv

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


# --------------------------------------------------------------------------- #
# Request schemas
# --------------------------------------------------------------------------- #

class UrlAnalysisRequest(BaseModel):
    url: str

class PhishingAnalysisRequest(BaseModel):
    content: str

class DeepfakeAnalysisRequest(BaseModel):
    media_reference: str   # base64 string, URL, or local file path


# --------------------------------------------------------------------------- #
# App setup
# --------------------------------------------------------------------------- #

app = FastAPI(title="CypherSight Backend", version="0.2.0")

frontend_origins = [
    origin.strip()
    for origin in getenv(
        "FRONTEND_ORIGINS",
        "http://localhost:3000,http://localhost:3001,http://localhost:3002,http://localhost:3003,http://localhost:3004,http://localhost:3005,http://localhost:5173",
    ).split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=frontend_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------------------------------- #
# Health check
# --------------------------------------------------------------------------- #

@app.get("/health")
def health() -> dict:
    return {"status": "ok", "version": "0.2.0"}


# --------------------------------------------------------------------------- #
# Endpoints
# --------------------------------------------------------------------------- #

@app.post("/analyze/phishing")
def analyze_phishing(payload: PhishingAnalysisRequest) -> dict:
    from models_layer.phishing_detector import phishing_detector_instance
    try:
        return phishing_detector_instance.analyze_message(payload.content)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


@app.post("/analyze/url")
def analyze_url(payload: UrlAnalysisRequest) -> dict:
    from models_layer.url_classifier import url_classifier_instance
    try:
        return url_classifier_instance.analyze_url(payload.url)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


@app.post("/analyze/deepfake")
def analyze_deepfake(payload: DeepfakeAnalysisRequest) -> dict:
    from models_layer.deepfake_detector import deepfake_detector_instance
    try:
        return deepfake_detector_instance.analyze_image(payload.media_reference)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) 