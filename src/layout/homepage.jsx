import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeatherContext } from '../logic/weathercontext.jsx';
import SearchBar from './searchbar.jsx';

function HomePage() {
  const { favorites } = useWeatherContext();
  const navigate = useNavigate();

  // Requisito: Clicar na favorita remete logo para a previsão
  const goToCity = (city) => {
    navigate(`/cidade/${encodeURIComponent(city)}`);
  };

  return (
    <main className="home-page">
      <section className="hero-section">
        <h1>Bem-vindo ao WeatherApp</h1>
        <p>Consulte a previsão do tempo para qualquer cidade.</p>
        <SearchBar />
      </section>

      {/* Requisito: Lista de Cidades Favoritas */}
      <section className="favorites-section">
        <h2>⭐ As Minhas Cidades</h2>
        
        {favorites.length > 0 ? (
          <div className="favorites-grid">
          {favorites.map((city) => (
              <div 
                key={city} 
                onClick={() => goToCity(city)}
                className="favorite-card"
              >
                <h3>{city}</h3>
                <span className="car-link">Ver previsão →</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-favorites">Ainda não adicionou cidades aos favoritos.</p>
        )}
      </section>
    </main>
  );
}

export default HomePage;