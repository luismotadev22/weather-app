import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../layout/SearchBar";
import { useWeatherContext } from "../logic/weathercontext";



function HomePage() {
  const { favorites } = useWeatherContext();
  const navigate = useNavigate();

  const goToCity = (cityId, cityName) => {
    navigate(`/cidade/${cityId}`, {
      state: { cityName },
    });
  };

  return (
    <main className="home-page">
      <section className="hero-section">
        <h1>Bem vindo ao WheatherApp</h1>
        <p>Consulte a previsão para as suas cidades favoritas.</p>
        <SearchBar />
      </section>

      <section className="favorites-section">
        <h2>⭐ Cidades Favoritas</h2>

        {favorites.length > 0 ? (
          <div className="favorites-grid">
            {favorites.map((city) => (
              <button
                key={city.id}
                onClick={() => goToCity(city.id, city.name)}
                className="favorite-card-button"
              >
                {/* O city.name agora funciona porque o contexto guardou o objeto */}
                <span className="city-name">{city.name}</span>
                <span className="view-label">Ver Detalhes</span>
              </button>
            ))}
          </div>
        ) : (
          <p className="no-favorites">Ainda não guardou nenhuma cidade.</p>
        )}
      </section>
    </main>
  );
}

export default HomePage;