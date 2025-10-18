import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Diabetes() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Pregnancies: "",
    Glucose: "",
    BloodPressure: "",
    SkinThickness: "",
    Insulin: "",
    BMI: "",
    DiabetesPedigreeFunction: "",
    Age: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://eva2-frontend.onrender.com/diabetes",
        {
          Pregnancies: Number(formData.Pregnancies),
          Glucose: Number(formData.Glucose),
          BloodPressure: Number(formData.BloodPressure),
          SkinThickness: Number(formData.SkinThickness),
          Insulin: Number(formData.Insulin),
          BMI: Number(formData.BMI),
          DiabetesPedigreeFunction: Number(formData.DiabetesPedigreeFunction),
          Age: Number(formData.Age),
        }
      );
      setResult(response.data);
    } catch (error) {
      console.error(error);
      setResult({ error: "Error al predecir. Revisa los datos ingresados." });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-50 to-pink-100 flex flex-col items-center justify-start p-8">

      {/* Header */}
      <div className="w-full max-w-3xl mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-pink-700 mb-2">
          Predicción de Diabetes
        </h1>
        <p className="text-pink-600 text-lg">
          Completa los datos del paciente para predecir la probabilidad de diabetes.
        </p>
      </div>

      {/* Form */}
      <form
        className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-6"
        onSubmit={handleSubmit}
      >
        {/* Pregnancies */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-pink-700">Embarazos</label>
          <input
            type="number"
            name="Pregnancies"
            value={formData.Pregnancies}
            onChange={handleChange}
            min="0"
            max="20"
            required
            className="border border-pink-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <small className="text-gray-500">Tipo: entero | Mín: 0, Máx: 20</small>
        </div>

        {/* Glucose */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-pink-700">Glucosa</label>
          <input
            type="number"
            name="Glucose"
            value={formData.Glucose}
            onChange={handleChange}
            min="50"
            max="250"
            required
            className="border border-pink-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <small className="text-gray-500">Tipo: número | Mín: 50, Máx: 250</small>
        </div>

        {/* BloodPressure */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-pink-700">Presión Arterial</label>
          <input
            type="number"
            name="BloodPressure"
            value={formData.BloodPressure}
            onChange={handleChange}
            min="40"
            max="140"
            required
            className="border border-pink-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <small className="text-gray-500">Tipo: número | Mín: 40, Máx: 140</small>
        </div>

        {/* SkinThickness */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-pink-700">Grosor de Piel</label>
          <input
            type="number"
            name="SkinThickness"
            value={formData.SkinThickness}
            onChange={handleChange}
            min="0"
            max="100"
            required
            className="border border-pink-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <small className="text-gray-500">Tipo: número | Mín: 0, Máx: 100</small>
        </div>

        {/* Insulin */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-pink-700">Insulina</label>
          <input
            type="number"
            name="Insulin"
            value={formData.Insulin}
            onChange={handleChange}
            min="0"
            max="900"
            required
            className="border border-pink-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <small className="text-gray-500">Tipo: número | Mín: 0, Máx: 900</small>
        </div>

        {/* BMI */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-pink-700">BMI</label>
          <input
            type="number"
            name="BMI"
            value={formData.BMI}
            onChange={handleChange}
            min="10"
            max="70"
            step="0.1"
            required
            className="border border-pink-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <small className="text-gray-500">Tipo: decimal | Mín: 10, Máx: 70</small>
        </div>

        {/* DiabetesPedigreeFunction */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-pink-700">Diabetes Pedigree Function</label>
          <input
            type="number"
            name="DiabetesPedigreeFunction"
            value={formData.DiabetesPedigreeFunction}
            onChange={handleChange}
            min="0"
            max="2.5"
            step="0.01"
            required
            className="border border-pink-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <small className="text-gray-500">Tipo: decimal | Mín: 0, Máx: 2.5</small>
        </div>

        {/* Age */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-pink-700">Edad</label>
          <input
            type="number"
            name="Age"
            value={formData.Age}
            onChange={handleChange}
            min="1"
            max="120"
            required
            className="border border-pink-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <small className="text-gray-500">Tipo: entero | Mín: 1, Máx: 120</small>
        </div>

        {/* Buttons */}
        <div className="col-span-full flex justify-between items-center mt-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-xl hover:bg-gray-400 transition-all"
          >
            Volver
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition-all"
          >
            Predecir
          </button>
        </div>
      </form>

      {/* Result */}
      {result && (
        <div className="mt-6 p-6 bg-pink-50 border border-pink-200 rounded-xl shadow-md text-center w-full max-w-3xl">
          {result.error ? (
            <p className="text-red-500 font-semibold">{result.error}</p>
          ) : (
            <p className="text-pink-700 font-bold text-xl">
              Predicción: {result.prediction === 1 ? "Diabético" : "No Diabético"}<br/>
              Probabilidad: {(result.probability * 100).toFixed(2)}%
            </p>
          )}
        </div>
      )}
    </div>
  );
}


