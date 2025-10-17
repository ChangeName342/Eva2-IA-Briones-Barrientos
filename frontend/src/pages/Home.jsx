import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaHospital } from 'react-icons/fa'; 

export default function Home() {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  const cards = [
    {
      title: 'Diabetes',
      description: 'Modelo de regresión logística para predecir la presencia de diabetes en pacientes.',
      icon: <FaHeartbeat className="text-pink-500 text-6xl mb-4 animate-pulse" />,
      bgGradient: 'from-pink-50 to-pink-100',
      buttonColor: 'bg-pink-600 hover:bg-pink-700',
      path: '/diabetes'
    },
    {
      title: 'Seguro Médico',
      description: 'Modelo de regresión lineal para estimar los costos de seguro médico según factores del paciente.',
      icon: <FaHospital className="text-blue-500 text-6xl mb-4 animate-bounce" />,
      bgGradient: 'from-blue-50 to-blue-100',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      path: '/insurance'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-blue-50 flex flex-col items-center justify-center p-6">

      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold text-indigo-800 mb-4 tracking-wide">
          Modelos de Predicción
        </h1>
        <p className="text-lg text-indigo-600 max-w-2xl mx-auto">
          Explora y prueba distintos modelos de predicción usando datos médicos. Selecciona uno de los modelos para comenzar.
        </p>
      </header>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 w-full max-w-5xl">
        {cards.map((card) => (
          <div
            key={card.title}
            onClick={() => handleClick(card.path)}
            className={`cursor-pointer bg-gradient-to-br ${card.bgGradient} rounded-3xl shadow-xl p-8 flex flex-col items-center justify-center hover:scale-105 hover:shadow-2xl transition-transform duration-300`}
          >
            {card.icon}
            <h2 className={`text-3xl font-bold mb-3 ${card.title === 'Diabetes' ? 'text-pink-600' : 'text-blue-600'}`}>{card.title}</h2>
            <p className={`text-center mb-6 ${card.title === 'Diabetes' ? 'text-pink-500' : 'text-blue-500'}`}>
              {card.description}
            </p>
            <button className={`px-8 py-3 ${card.buttonColor} text-white font-semibold rounded-xl shadow-md transition-all duration-300`}>
              Probar Modelo
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

