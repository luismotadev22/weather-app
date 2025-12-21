import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FaChevronLeft } from 'react-icons/fa';
import { fetchCurrentWeather } from '../logic/api_weather.jsx'; // Ajusta o caminho
import { useWeatherContext } from '../logic/weathercontext.jsx';
import CurrentWeatherCard from './currentweathercard.jsx'; 

// Botão de favorito
const FavoriteButton = ({ city }) => {
  const { isFavorite, addFavorite, removeFavorite } = useWeatherContext();

  const favorite = isFavorite(city);

  const handleClick = () => {
    favorite ? removeFavorite(city) : addFavorite(city);
  };

  return (
    <button 
      onClick={handleClick}
      className="favorite-btn"
      style={{ fontSize: '1.5rem', cursor: 'pointer', background: 'none', border: 'none' }}
    >
      {favorite ? '⭐' : '☆'}
    </button>
  );
};

function CityDetailPage() {
  const { id: cityId } = useParams(); // agora recebemos o ID
  const location = useLocation();
  const cityName = location.state?.cityName || "Cidade";

  const { data: weatherData, isLoading, isError, error } = useQuery({
    queryKey: ['currentWeather', cityId],
    queryFn: () => fetchCurrentWeather(cityName),
    retry: 1,
  });

  if (isLoading) {
    return <div className="city-detail-container"><p>A carregar...</p></div>;
  }

  if (isError) {
    return <div className="city-detail-container"><p>Erro: {error.message}</p></div>;
  }

  return (
    <div className="city-detail-container" style={{ padding: '20px' }}>
      <div className="detail-header" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <h1>{weatherData.city}, PT</h1>
        <FavoriteButton city={{ id: weatherData.cityId, name: weatherData.city }} />
      </div>

      <Link to="/" className="back-link" style={{display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none', color: '#007bff'}}>
        <FaChevronLeft /> Voltar à Pesquisa
      </Link>

      <CurrentWeatherCard data={weatherData} />
    </div>
  );
}

export default CityDetailPage;