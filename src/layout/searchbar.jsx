import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/cidade/${encodeURIComponent(query)}`);
      setQuery('');
    }
  };

  return (
    /* REMOVIDO O STYLE INLINE - AGORA USA AS CLASSES DO CSS */
    <form onSubmit={handleSearch} className="search-form">
      <input
        type="text"
        placeholder="Pesquisar cidade..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button">
        Pesquisar
      </button>
    </form>
  );
}

export default SearchBar;