import React from "react";
import { FaThermometerHalf, FaTint, FaWind } from "react-icons/fa";
import { weatherTypeMap } from "../logic/weatherTypeMap";

function CurrentWeatherCard({ data, unit = "°C" }) {
  if (!data) return null;

  const {
    tempMin,
    tempMax,
    rainProbability,
    windSpeedClass,
    weatherTypeId,
  } = data;

  // Obtém ícone, label e cor a partir do weatherTypeId
  const weather = weatherTypeMap[weatherTypeId] || {
    label: "Desconhecido",
    icon: "❔",
    color: "#B0BEC5",
  };

  return (
  <section className="weather-card">
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
        <small>Máx/Min</small>
      </div>
      <div className="detail-item">
        <span>{rainProbability}%</span>
        <small>Chuva</small>
      </div>
      <div className="detail-item">
        <span>{windSpeedClass}</span>
        <small>Vento</small>
      </div>
    </div>
  </section>
);}

export default CurrentWeatherCard;
      
