from fastapi import APIRouter
from pydantic import BaseModel, Field
import numpy as np
import pickle
import os

router = APIRouter()

# -------------------
# Directorio base y carpeta de datos
# -------------------
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))
DATA_DIR = os.path.join(BASE_DIR, "data")

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
diabetes_model_lr = load_pickle(os.path.join(DATA_DIR, "diabetes_model_lr.pkl"), "Diabetes Logistic Regression Model")
diabetes_model_rf = load_pickle(os.path.join(DATA_DIR, "diabetes_model_rf.pkl"), "Diabetes Random Forest Model")
diabetes_scaler = load_pickle(os.path.join(DATA_DIR, "diabetes_scaler.pkl"), "Diabetes Scaler")

insurance_model_lr = load_pickle(os.path.join(DATA_DIR, "insurance_model_lr.pkl"), "Insurance Linear Regression Model")
insurance_model_rf = load_pickle(os.path.join(DATA_DIR, "insurance_model_rf.pkl"), "Insurance RF Model")

# -------------------
# Schema Diabetes
# -------------------
class DiabetesInput(BaseModel):
    Pregnancies: int = Field(..., ge=0, le=20)
    Glucose: float = Field(..., ge=50, le=250)
    BloodPressure: float = Field(..., ge=40, le=120)
    SkinThickness: float = Field(..., ge=0, le=100)
    Insulin: float = Field(..., ge=0, le=900)
    BMI: float = Field(..., ge=10, le=70)
    DiabetesPedigreeFunction: float = Field(..., ge=0, le=3)
    Age: int = Field(..., ge=10, le=100)

# -------------------
# Schema Insurance
# -------------------
class InsuranceInput(BaseModel):
    age: int = Field(..., ge=1, le=120)
    sex: int = Field(..., ge=0, le=1)
    bmi: float = Field(..., ge=10, le=70)
    children: int = Field(..., ge=0, le=10)
    smoker: int = Field(..., ge=0, le=1)
    region: int = Field(..., ge=0, le=3)

# -------------------
# Endpoint Diabetes (ambos modelos)
# -------------------
@router.post("/predict/diabetes")
def predict_diabetes(data: DiabetesInput):
    if diabetes_model_lr is None or diabetes_model_rf is None or diabetes_scaler is None:
        return {"error": "Modelos de diabetes no disponibles."}

    x = np.array([[data.Pregnancies, data.Glucose, data.BloodPressure,
                   data.SkinThickness, data.Insulin, data.BMI,
                   data.DiabetesPedigreeFunction, data.Age]])
    x_scaled = diabetes_scaler.transform(x)

    # Logistic Regression
    pred_lr = diabetes_model_lr.predict(x_scaled)[0]
    prob_lr = diabetes_model_lr.predict_proba(x_scaled)[0][1]

    # Random Forest
    pred_rf = diabetes_model_rf.predict(x_scaled)[0]
    prob_rf = diabetes_model_rf.predict_proba(x_scaled)[0][1]

    return {
        "logistic_regression": {"prediction": int(pred_lr), "probability": float(prob_lr)},
        "random_forest": {"prediction": int(pred_rf), "probability": float(prob_rf)}
    }

# -------------------
# Endpoint Insurance (ambos modelos)
# -------------------
@router.post("/predict/insurance")
def predict_insurance(data: InsuranceInput):
    if insurance_model_lr is None or insurance_model_rf is None:
        return {"error": "Modelos de seguro no disponibles."}

    x = np.array([[data.age, data.sex, data.bmi, data.children, data.smoker, data.region]])

    pred_lr = insurance_model_lr.predict(x)[0]
    pred_rf = insurance_model_rf.predict(x)[0]

    return {
        "linear_regression": {"prediction": float(pred_lr)},
        "random_forest": {"prediction": float(pred_rf)}
    }






