import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCurrentWeather } from "../logic/api_weather.jsx";


function SearchBar() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    if (!query.trim()) return;

    try {
      setLoading(true);
      const data = await fetchCurrentWeather(query);

      // Navega para página da cidade usando ID e passando state
      navigate(`/cidade/${data.cityId}`, { state: { cityName: data.city } });
      setQuery("");
    } catch (err) {
      setError(err.message || "Erro ao buscar cidade");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-form">
      <input
        type="text"
        placeholder="Pesquisar cidade..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button" disabled={loading}>
        {loading ? "A pesquisar..." : "Pesquisar"}
      </button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
}

export default SearchBar;