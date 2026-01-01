import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Navegamos diretamente. A CityDetailPage tratará de converter o nome em ID se necessário.
    navigate(`/cidade/${encodeURIComponent(query.trim())}`);
    setQuery("");
  };

  return (
    <form onSubmit={handleSearch} className="search-form">
      <input
        type="text"
        placeholder="Pesquisar cidade (ex: Lisboa)..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button">Pesquisar</button>
    </form>
  );
}

export default SearchBar;