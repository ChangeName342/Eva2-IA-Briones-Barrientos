from fastapi import APIRouter
from pydantic import BaseModel, Field
import numpy as np
import pickle
import os

router = APIRouter()

# -------------------
# Función segura para cargar pickle
# -------------------
def load_pickle(path, name):
    try:
        with open(path, "rb") as f:
            model = pickle.load(f)
        print(f"{name} cargado correctamente desde {path}")
        return model
    except FileNotFoundError:
        print(f"Error: {name} NO encontrado en {path}")
    except Exception as e:
        print(f"Error cargando {name}: {e}")
    return None

# -------------------
# Cargar modelos
# -------------------
print("Ruta actual:", os.getcwd())
diabetes_model = load_pickle("data/diabetes_model.pkl", "Diabetes Model")
diabetes_scaler = load_pickle("data/diabetes_scaler.pkl", "Diabetes Scaler")
insurance_model_lr = load_pickle("data/insurance_model_lr.pkl", "Insurance LR Model")
insurance_model_rf = load_pickle("data/insurance_model_rf.pkl", "Insurance RF Model")

# -------------------
# Schema Diabetes
# -------------------
class DiabetesInput(BaseModel):
    Pregnancies: int = Field(..., ge=0, le=20, description="Número de embarazos (0-20)")
    Glucose: float = Field(..., ge=50, le=250, description="Nivel de glucosa (50-250 mg/dL)")
    BloodPressure: float = Field(..., ge=40, le=120, description="Presión arterial (40-120 mmHg)")
    SkinThickness: float = Field(..., ge=0, le=100, description="Grosor de piel (0-100 mm)")
    Insulin: float = Field(..., ge=0, le=900, description="Nivel de insulina (0-900 muU/mL)")
    BMI: float = Field(..., ge=10, le=70, description="Índice de masa corporal (10-70)")
    DiabetesPedigreeFunction: float = Field(..., ge=0, le=3, description="Función de pedigree diabético (0-3)")
    Age: int = Field(..., ge=10, le=100, description="Edad del paciente (10-100 años)")

# -------------------
# Schema Seguro Médico
# -------------------
class InsuranceInput(BaseModel):
    age: int = Field(..., ge=1, le=120, description="Edad (1-120)")
    sex: int = Field(..., ge=0, le=1, description="Sexo (0=femenino, 1=masculino)")
    bmi: float = Field(..., ge=10, le=70, description="BMI (10-70)")
    children: int = Field(..., ge=0, le=10, description="Número de hijos (0-10)")
    smoker: int = Field(..., ge=0, le=1, description="Fumador (0=no, 1=sí)")
    region: int = Field(..., ge=1, le=4, description="Región (1=NW, 2=NE, 3=SW, 4=SE)")

# -------------------
# Endpoints Diabetes
# -------------------
@router.post("/predict/diabetes")
def predict_diabetes(data: DiabetesInput):
    if diabetes_model is None or diabetes_scaler is None:
        return {"error": "Modelo de diabetes no disponible."}

    x = np.array([[data.Pregnancies, data.Glucose, data.BloodPressure, 
                   data.SkinThickness, data.Insulin, data.BMI, 
                   data.DiabetesPedigreeFunction, data.Age]])
    x_scaled = diabetes_scaler.transform(x)
    pred = diabetes_model.predict(x_scaled)
    prob = diabetes_model.predict_proba(x_scaled)[0][1]
    return {"prediction": int(pred[0]), "probability": float(prob)}

# -------------------
# Endpoints Seguro Médico
# -------------------
@router.post("/predict/insurance/lr")
def predict_insurance_lr(data: InsuranceInput):
    if insurance_model_lr is None:
        return {"error": "Modelo de seguro LR no disponible."}

    x = np.array([[data.age, data.sex, data.bmi, data.children, data.smoker, data.region]])
    pred = insurance_model_lr.predict(x)
    return {"prediction": float(pred[0])}

@router.post("/predict/insurance/rf")
def predict_insurance_rf(data: InsuranceInput):
    if insurance_model_rf is None:
        return {"error": "Modelo de seguro RF no disponible."}

    x = np.array([[data.age, data.sex, data.bmi, data.children, data.smoker, data.region]])
    pred = insurance_model_rf.predict(x)
    return {"prediction": float(pred[0])}



