from os import getenv

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


class UrlAnalysisRequest(BaseModel):
    url: str


class PhishingAnalysisRequest(BaseModel):
    content: str


class DeepfakeAnalysisRequest(BaseModel):
    media_reference: str


app = FastAPI(title="CypherSight Backend")

frontend_origins = [
    origin.strip()
    for origin in getenv(
        "FRONTEND_ORIGINS", "http://localhost:3000,http://localhost:5173"
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


@app.post("/analyze/url")
def analyze_url(payload: UrlAnalysisRequest) -> dict:
    return {
        "status": "placeholder",
        "endpoint": "/analyze/url",
        "input": payload.model_dump(),
    }


@app.post("/analyze/phishing")
def analyze_phishing(payload: PhishingAnalysisRequest) -> dict:
    return {
        "status": "placeholder",
        "endpoint": "/analyze/phishing",
        "input": payload.model_dump(),
    }


@app.post("/analyze/deepfake")
def analyze_deepfake(payload: DeepfakeAnalysisRequest) -> dict:
    return {
        "status": "placeholder",
        "endpoint": "/analyze/deepfake",
        "input": payload.model_dump(),
    }
