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

    const sexNum = formData.sex === "male" ? 0 : 1;
    const smokerNum = formData.smoker === "yes" ? 1 : 0;
    const regionMap = { southwest: 0, southeast: 1, northwest: 2, northeast: 3 };
    const regionNum = regionMap[formData.region] || 2;

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/predict/insurance",
        {
          age: Number(formData.age),
          sex: sexNum,
          bmi: Number(formData.bmi),
          children: Number(formData.children),
          smoker: smokerNum,
          region: regionNum,
        }
      );
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

  const renderPrediction = (title, value) => (
    <div className="mt-4 p-4 bg-blue-100 border border-blue-200 rounded-xl shadow-md text-center flex-1">
      <h3 className="text-blue-700 font-bold mb-1">{title}</h3>
      <p className="text-blue-700 font-semibold">
        Predicción: ${value.toFixed(2)}
      </p>
    </div>
  );

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

      {/* Formulario */}
      <form
        className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-6"
        onSubmit={handleSubmit}
      >
        {/* Campos del formulario */}
        {[
          { label: "Edad", name: "age", type: "number", min: 1, max: 120 },
          { label: "Sexo", name: "sex", type: "select", options: ["Masculino", "Femenino"] },
          { label: "BMI", name: "bmi", type: "number", min: 10, max: 70, step: 0.1 },
          { label: "Número de Hijos", name: "children", type: "number", min: 0, max: 10 },
          { label: "Fumador", name: "smoker", type: "select", options: ["No", "Si"] },
          { label: "Región", name: "region", type: "select", options: ["northwest", "northeast", "southwest", "southeast"] },
        ].map((field) => (
          <div className="flex flex-col" key={field.name}>
            <label className="mb-1 font-medium text-blue-700">{field.label}</label>
            {field.type === "select" ? (
              <select
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="number"
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                min={field.min}
                max={field.max}
                step={field.step || 1}
                required
                className="border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            )}
            <small className="text-gray-500">
              {field.type === "number"
                ? field.step && field.step < 1
                  ? `Tipo: decimal | Mín: ${field.min}, Máx: ${field.max}`
                  : `Tipo: entero | Mín: ${field.min}, Máx: ${field.max}`
                : `Tipo: opción`}
            </small>
          </div>
        ))}

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

      {/* Resultados */}
      {result && (
        <div className="mt-6 w-full max-w-3xl flex flex-col sm:flex-row gap-4">
          {result.error ? (
            <p className="text-red-500 font-semibold text-center">{result.error}</p>
          ) : (
            <>
              {renderPrediction("Regresión Lineal", result.linear_regression.prediction)}
              {renderPrediction("Random Forest", result.random_forest.prediction)}
            </>
          )}
        </div>
      )}
    </div>
  );
}




