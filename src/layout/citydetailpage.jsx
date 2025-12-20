import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FaChevronLeft } from 'react-icons/fa';

// Comentei estas para o Vite não reclamar de ficheiros que ainda não criaste
// import { fetchCurrentWeather } from '../api/weather.js';
import { useWeatherContext } from '../logic/weathercontext.jsx';
import CurrentWeatherCard from './currentweathercard.jsx'; 

const FavoriteButton = ({ city }) => {
  // Se o contexto ainda não estiver pronto, retornamos um placeholder
  try {
    const { isFavorite, addFavorite, removeFavorite } = useWeatherContext();
    const favorite = isFavorite(city);
    return (
      <button 
        onClick={() => favorite ? removeFavorite(city) : addFavorite(city)}
        className="favorite-btn"
        style={{ fontSize: '1.5rem', cursor: 'pointer', background: 'none', border: 'none' }}
      >
        {favorite ? '⭐' : '☆'}
      </button>
    );
  } catch (e) {
    return <button style={{ border: 'none', background: 'none' }}>☆</button>;
  }
};

function CityDetailPage() {
  const { cityName: encodedCityName } = useParams();
  const cityName = decodeURIComponent(encodedCityName || "Cidade");

  // USANDO DADOS MOCK (MANUAIS) PARA O LAYOUT
  const { data: weatherData, isLoading } = useQuery({
    queryKey: ['currentWeather', cityName],
    queryFn: () => ({
      name: cityName,
      sys: { country: "PT" },
      main: { 
        temp: 22.5, 
        feels_like: 20,
        humidity: 60,
        temp_max: 25,
        temp_min: 18
      },
      wind: { speed: 10 },
      weather: [{ description: "céu limpo", icon: "01d" }]
    }),
  });

  if (isLoading) {
    return <div className="city-detail-container"><p>A carregar...</p></div>;
  }

  // Removido o bloco "if (error)" para evitar que o script quebre enquanto testas o layout

  return (
    <div className="city-detail-container" style={{ padding: '20px' }}>
      <div className="detail-header" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <h1>{weatherData.name}, {weatherData.sys?.country}</h1>
        <FavoriteButton city={weatherData.name} />
      </div>

      <Link to="/" className="back-link" style={{display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none', color: '#007bff'}}>
        <FaChevronLeft /> Voltar à Pesquisa
      </Link>

      {/* Este componente agora vai ler os dados mock acima */}
      <CurrentWeatherCard data={weatherData} />
    </div>
  );
}

export default CityDetailPage;