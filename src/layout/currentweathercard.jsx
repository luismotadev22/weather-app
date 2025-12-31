import React from "react";
import { FaThermometerHalf, FaTint, FaWind } from "react-icons/fa";
import { weatherTypeMap } from "../logic/weatherTypeMap";

function CurrentWeatherCard({ data, unit = "°C" }) {
  if (!data) return null;

  // Extraímos os dados que vêm formatados da api_weather.jsx
  const {
    tempMin,
    tempMax,
    precipitaProb, // Nome correto vindo da API
    windSpeedClass,
    weatherTypeId,
  } = data;

  const weather = weatherTypeMap[weatherTypeId] || {
    label: "Desconhecido",
    icon: "❔",
    color: "#B0BEC5",
  };

  return (
    <section 
      className="weather-card" 
      style={{ borderTop: `6px solid ${weather.color}` }} // Borda colorida no topo
    >
      <header className="weather-main">
        <span className="weather-icon">{weather.icon}</span>
        <h2 className="weather-label">{weather.label}</h2>
        
        <div className="weather-temp">
          <span className="temp-max">{tempMax}{unit}</span>
          <span className="temp-separator">/</span>
          <span className="temp-min">{tempMin}{unit}</span>
        </div>
      </header>

      <div className="weather-details">
        <div className="detail-item">
          <FaThermometerHalf />
          <span>{tempMax}/{tempMin}</span>
          <small>Máx/Min</small>
        </div>
        <div className="detail-item">
          <FaTint />
          <span>{precipitaProb}%</span>
          <small>Chuva</small>
        </div>
        <div className="detail-item">
          <FaWind />
          <span>Classe {windSpeedClass}</span>
          <small>Vento</small>
        </div>
      </div>
    </section>
  );
}

export default CurrentWeatherCard;