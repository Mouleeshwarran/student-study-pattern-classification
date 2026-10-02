from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import joblib
import pandas as pd
from pathlib import Path


# ============================================================
# Configuration
# ============================================================

BASE_DIR = Path(__file__).resolve().parent

MODEL_PATH = BASE_DIR / "study_pattern_model_v2.joblib"
FEATURE_PATH = BASE_DIR / "feature_names_v2.joblib"
CLASS_PATH = BASE_DIR / "class_names_v2.joblib"


# ============================================================
# Load Model
# ============================================================

try:
    model = joblib.load(MODEL_PATH)
    feature_names = joblib.load(FEATURE_PATH)
    class_names = joblib.load(CLASS_PATH)

    print("Model loaded successfully.")
    print("Features:", feature_names)
    print("Classes:", class_names)

except Exception as e:
    raise RuntimeError(f"Failed to load model files: {e}")


# ============================================================
# FastAPI
# ============================================================

app = FastAPI(
    title="Student Study Pattern Classification API",
    description="ML API for classifying student study patterns",
    version="2.0.0"
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# Request Model
# ============================================================

class PredictionRequest(BaseModel):

    study_hours: int = Field(..., ge=1, le=4)
    sleep_hours: int = Field(..., ge=1, le=4)
    revision_frequency: int = Field(..., ge=1, le=4)
    assignment_procrastination: int = Field(..., ge=1, le=4)
    study_distraction: int = Field(..., ge=1, le=4)
    phone_usage: int = Field(..., ge=1, le=4)
    social_media_hours: int = Field(..., ge=1, le=4)
    study_schedule: int = Field(..., ge=1, le=4)
    exam_preparation: int = Field(..., ge=1, le=4)
    planned_goals_completed: int = Field(..., ge=1, le=4)
    academic_confidence: int = Field(..., ge=1, le=4)
    study_stress: int = Field(..., ge=1, le=4)


# ============================================================
# Health Check
# ============================================================

@app.get("/health")
def health():

    return {
        "status": "ok",
        "model": "study_pattern_model_v2",
        "version": "2.0.0"
    }


# ============================================================
# Features
# ============================================================

@app.get("/features")
def get_features():

    return {
        "features": feature_names,
        "classes": class_names
    }


# ============================================================
# Prediction
# ============================================================

@app.post("/predict")
def predict(request: PredictionRequest):

    try:

        # Convert request into dictionary
        data = request.model_dump()

        # IMPORTANT:
        # Maintain exactly the same feature order
        # used during model training.
        input_data = {
            feature: data[feature]
            for feature in feature_names
        }

        # DataFrame preserves feature names and removes
        # the StandardScaler warning.
        X = pd.DataFrame([input_data])

        # Prediction
        prediction = model.predict(X)[0]

        # Probabilities
        probabilities = model.predict_proba(X)[0]

        # Confidence
        confidence = float(max(probabilities))

        # Probability for every class
        class_probabilities = {
            class_name: round(float(probability) * 100, 2)
            for class_name, probability
            in zip(model.classes_, probabilities)
        }

        return {
            "prediction": prediction,
            "confidence": round(confidence * 100, 2),
            "class_probabilities": class_probabilities,
            "features": input_data
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )


# ============================================================
# Root
# ============================================================

@app.get("/")
def root():

    return {
        "message": "Student Study Pattern Classification API",
        "version": "2.0.0",
        "model": "study_pattern_model_v2",
        "endpoints": [
            "GET /health",
            "GET /features",
            "POST /predict"
        ]
    }
