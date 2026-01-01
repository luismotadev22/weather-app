import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaArrowLeft, FaStar, FaRegStar } from "react-icons/fa"; 
import { fetchCurrentWeather } from "../logic/api_weather.jsx";
import { useWeatherContext } from "../logic/weathercontext.jsx";
import CurrentWeatherCard from "./currentweathercard.jsx";

// --- Botão de Favorito ---
const FavoriteButton = ({ weatherData }) => {
  const { isFavorite, addFavorite, removeFavorite } = useWeatherContext();
  
  const id = String(weatherData.cityId);
  const name = weatherData.city; 
  const favorite = isFavorite(id);

  const handleToggle = () => {
    if (favorite) {
      removeFavorite(id);
    } else {
      addFavorite({ id, name });
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="favorite-btn"
      title={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
    >
      {favorite ? (
        <FaStar size={35} color="#ffca28" />
      ) : (
        <FaRegStar size={35} color="#ccc" />
      )}
    </button>
  );
};

// --- Página Principal de Detalhe ---
function CityDetailPage() {
  const { cityId } = useParams();
  
  const { data: weatherData, isLoading, isError, error } = useQuery({
    queryKey: ["currentWeather", cityId],
    queryFn: () => fetchCurrentWeather(cityId),
    retry: 1,
    enabled: !!cityId,
  });

  if (isLoading) return <div className="loading">A carregar...</div>;
  
  if (isError) return (
    <div className="error-container">
      <p>⚠️ {error.message}</p>
      <Link to="/" className="back-link">
        <FaArrowLeft /> Voltar à pesquisa
      </Link>
    </div>
  );

  if (!weatherData) return null;

  return (
    <div className="city-detail-container">
      
      {/* 1. Botão de Voltar (Usando a classe CSS .back-link) */}
      <Link to="/" className="back-link">
        <FaArrowLeft /> Voltar
      </Link>

      {/* 2. Cabeçalho (Usando a classe CSS .detail-header) */}
      <header className="detail-header">
        <h1>{weatherData.city}, PT</h1>
        
        {/* A estrela vai alinhar à direita automaticamente devido ao CSS */}
        <FavoriteButton weatherData={weatherData} />
      </header>

      <CurrentWeatherCard data={weatherData} />
    </div>
  );
}

export default CityDetailPage;