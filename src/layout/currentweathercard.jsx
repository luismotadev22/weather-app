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
    <section
      className="weather-card"
      style={{
        border: `2px solid ${weather.color}`,
        borderRadius: "12px",
        padding: "20px",
        maxWidth: "400px",
        margin: "20px auto",
        backgroundColor: "#f5f5f5",
      }}
    >
      <header
        className="card-header"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span style={{ fontSize: "3rem" }}>{weather.icon}</span>
        <h2 style={{ margin: 0 }}>{weather.label}</h2>
        <p>
          Temp Máx/Min: {tempMax}{unit} / {tempMin}{unit}
        </p>
        <p>Probabilidade de Chuva: {rainProbability}%</p>
        <p>Velocidade do Vento: {windSpeedClass}</p>
      </header>

      <div
        className="card-details"
        style={{ display: "flex", justifyContent: "space-around", marginTop: "15px" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <FaThermometerHalf /> <span>Máx/Min</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <FaTint /> <span>Chuva</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <FaWind /> <span>Vento</span>
        </div>
      </div>
    </section>
  );
}

export default CurrentWeatherCard;