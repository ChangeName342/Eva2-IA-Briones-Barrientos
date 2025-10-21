import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression, LinearRegression
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
import pickle
import os

# -------------------------
# Carpeta de datos (apunta a backend/data)
# -------------------------
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../.."))  # backend/
DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../data"))
os.makedirs(DATA_DIR, exist_ok=True)

# -------------------------
# DIABETES
# -------------------------
diabetes_df = pd.read_csv(os.path.join(DATA_DIR, "diabetes.csv"))
print("Columnas diabetes.csv:", diabetes_df.columns.tolist())

# Nombre de la columna objetivo
target_column = [c for c in diabetes_df.columns if "Outcome" in c or "outcome" in c][0]

X = diabetes_df.drop(target_column, axis=1)
y = diabetes_df[target_column]

# Escalado
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Entrenamiento
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# Modelo Logistic Regression
diabetes_model_lr = LogisticRegression(max_iter=1000)
diabetes_model_lr.fit(X_train, y_train)

# Modelo Random Forest
diabetes_model_rf = RandomForestClassifier(n_estimators=100, random_state=42)
diabetes_model_rf.fit(X_train, y_train)

# Guardar modelos y scaler
with open(os.path.join(DATA_DIR, "diabetes_model_lr.pkl"), "wb") as f:
    pickle.dump(diabetes_model_lr, f)

with open(os.path.join(DATA_DIR, "diabetes_model_rf.pkl"), "wb") as f:
    pickle.dump(diabetes_model_rf, f)

with open(os.path.join(DATA_DIR, "diabetes_scaler.pkl"), "wb") as f:
    pickle.dump(scaler, f)

print("Modelos de diabetes guardados correctamente.")

# -------------------------
# SEGURO MÉDICO
# -------------------------
insurance_df = pd.read_csv(os.path.join(DATA_DIR, "insurance.csv"))
print("Columnas insurance.csv:", insurance_df.columns.tolist())

# Convertir categóricas a numéricas
insurance_df['sex'] = insurance_df['sex'].map({'male': 0, 'female': 1})
insurance_df['smoker'] = insurance_df['smoker'].map({'no': 0, 'yes': 1})
insurance_df['region'] = insurance_df['region'].map({
    'southwest': 0, 'southeast': 1, 'northwest': 2, 'northeast': 3
})

insurance_target = 'charges'
X_ins = insurance_df.drop(insurance_target, axis=1)
y_ins = insurance_df[insurance_target]

X_train_ins, X_test_ins, y_train_ins, y_test_ins = train_test_split(X_ins, y_ins, test_size=0.2, random_state=42)

# Regresión lineal
insurance_model_lr = LinearRegression()
insurance_model_lr.fit(X_train_ins, y_train_ins)

# Random Forest
insurance_model_rf = RandomForestRegressor(n_estimators=100, random_state=42)
insurance_model_rf.fit(X_train_ins, y_train_ins)

# Guardar modelos
with open(os.path.join(DATA_DIR, "insurance_model_lr.pkl"), "wb") as f:
    pickle.dump(insurance_model_lr, f)

with open(os.path.join(DATA_DIR, "insurance_model_rf.pkl"), "wb") as f:
    pickle.dump(insurance_model_rf, f)

print("Modelos de seguro médico guardados correctamente.")




