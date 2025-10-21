import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Model() {
  const location = useLocation();
  const modelName = location.state?.model || "Diabetes";

  const [formData, setFormData] = useState({});
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const baseURL = "https://eva2-backend.onrender.com";

    let endpoint = "";
    if (modelName === "Diabetes")
      endpoint = "${baseURL}/predict/diabetes";
    else if (modelName === "Insurance LR")
      endpoint = "${baseURL}/predict/insurance/lr";
    else
      endpoint = "${baseURL}/predict/insurance/rf";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setPrediction(data);
    } catch (error) {
      console.error("Error al obtener predicción:", error);
      setPrediction({ error: "No se pudo obtener una predicción." });
    }
  };

  // Definir campos según el modelo
  const fields =
    modelName === "Diabetes"
      ? [
          "Pregnancies",
          "Glucose",
          "BloodPressure",
          "SkinThickness",
          "Insulin",
          "BMI",
          "DiabetesPedigreeFunction",
          "Age",
        ]
      : ["age", "sex", "bmi", "children", "smoker", "region"];

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">
        {modelName} Prediction
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-3 bg-white shadow-md p-6 rounded-2xl"
      >
        {fields.map((f) => (
          <input
            key={f}
            type="text"
            name={f}
            placeholder={f}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        ))}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded w-full mt-3 transition"
        >
          Predict
        </button>
      </form>

      {prediction && (
        <div className="mt-6 p-4 bg-gray-100 rounded-xl shadow-inner">
          <h2 className="text-lg font-semibold mb-2">Resultado:</h2>
          <pre className="text-sm">{JSON.stringify(prediction, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

