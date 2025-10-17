import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Model() {
  const location = useLocation();
  const modelName = location.state?.model || "Diabetes";

  const [formData, setFormData] = useState({});
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let endpoint = "";
    if(modelName === "Diabetes") endpoint = "http://127.0.0.1:8000/predict/diabetes";
    else if(modelName === "Insurance LR") endpoint = "http://127.0.0.1:8000/predict/insurance/lr";
    else endpoint = "http://127.0.0.1:8000/predict/insurance/rf";

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    setPrediction(data);
  };

  // Definir campos según modelo
  const fields = modelName === "Diabetes" ? 
    ["Pregnancies","Glucose","BloodPressure","SkinThickness","Insulin","BMI","DiabetesPedigreeFunction","Age"] :
    ["age","sex","bmi","children","smoker","region"];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{modelName} Prediction</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        {fields.map((f) => (
          <input 
            key={f}
            type="number"
            step="any"
            name={f}
            placeholder={f}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        ))}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-2">Predict</button>
      </form>
      {prediction && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <pre>{JSON.stringify(prediction, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
