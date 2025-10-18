import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Insurance() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    age: "",
    sex: "male",
    bmi: "",
    children: "",
    smoker: "no",
    region: "northwest",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);
    setLoading(true);

    const sexNum = formData.sex === "male" ? 1 : 0;
    const smokerNum = formData.smoker === "yes" ? 1 : 0;
    const regionMap = {
      northwest: 1,
      northeast: 2,
      southwest: 3,
      southeast: 4,
    };
    const regionNum = regionMap[formData.region] || 1;

    console.log("Datos enviados al backend:", {
      age: Number(formData.age),
      sex: sexNum,
      bmi: Number(formData.bmi),
      children: Number(formData.children),
      smoker: smokerNum,
      region: regionNum,
    });

    try {
      const response = await axios.post(
        "https://eva2-backend.onrender.com/insurance",
        {
          age: Number(formData.age),
          sex: sexNum,
          bmi: Number(formData.bmi),
          children: Number(formData.children),
          smoker: smokerNum,
          region: regionNum,
        }
      );
      console.log("Respuesta del backend:", response.data);
      setResult(response.data);
    } catch (error) {
      console.error(
        "Error en la predicción:",
        error.response ? error.response.data : error.message
      );
      setResult({ error: "Error al predecir. Revisa los datos ingresados." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col items-center justify-start p-8">
      {/* Header */}
      <div className="w-full max-w-3xl mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-2">
          Predicción de Seguro Médico
        </h1>
        <p className="text-blue-600 text-lg">
          Completa los datos del paciente para estimar el costo del seguro médico.
        </p>
      </div>

      {/* Form */}
      <form
        className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-6"
        onSubmit={handleSubmit}
      >
        {/* Edad */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-blue-700">Edad</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="1"
            max="120"
            required
            className="border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <small className="text-gray-500">Tipo: número | Mín: 1, Máx: 120</small>
        </div>

        {/* Sexo */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-blue-700">Sexo</label>
          <select
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            className="border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
          </select>
          <small className="text-gray-500">Tipo: opción (Masculino/Femenino)</small>
        </div>

        {/* BMI */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-blue-700">BMI</label>
          <input
            type="number"
            name="bmi"
            value={formData.bmi}
            onChange={handleChange}
            min="10"
            max="70"
            step="0.1"
            required
            className="border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <small className="text-gray-500">Tipo: número decimal | Mín: 10, Máx: 70</small>
        </div>

        {/* Número de hijos */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-blue-700">Número de Hijos</label>
          <input
            type="number"
            name="children"
            value={formData.children}
            onChange={handleChange}
            min="0"
            max="10"
            required
            className="border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <small className="text-gray-500">Tipo: número entero | Mín: 0, Máx: 10</small>
        </div>

        {/* Fumador */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-blue-700">Fumador</label>
          <select
            name="smoker"
            value={formData.smoker}
            onChange={handleChange}
            className="border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="no">No</option>
            <option value="yes">Sí</option>
          </select>
          <small className="text-gray-500">Tipo: opción (Sí/No)</small>
        </div>

        {/* Región */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-blue-700">Región</label>
          <select
            name="region"
            value={formData.region}
            onChange={handleChange}
            className="border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="northwest">Northwest</option>
            <option value="northeast">Northeast</option>
            <option value="southwest">Southwest</option>
            <option value="southeast">Southeast</option>
          </select>
          <small className="text-gray-500">
            Tipo: opción | Northwest, Northeast, Southwest, Southeast
          </small>
        </div>

        {/* Botones */}
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
            disabled={loading}
            className={`px-6 py-2 ${
              loading ? "bg-gray-400" : "bg-blue-600"
            } text-white rounded-xl hover:bg-blue-700 transition-all`}
          >
            {loading ? "Calculando..." : "Predecir"}
          </button>
        </div>
      </form>

      {/* Resultado */}
      {result && (
        <div className="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-xl shadow-md text-center w-full max-w-3xl">
          {result.error ? (
            <p className="text-red-500 font-semibold">{result.error}</p>
          ) : (
            <p className="text-blue-700 font-bold text-xl">
              Predicción: ${result.prediction.toFixed(2)}
            </p>
          )}
        </div>
      )}
    </div>
  );
}



