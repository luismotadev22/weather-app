import React, { createContext, useContext, useState, useEffect } from "react";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  // Inicializa os favoritos a partir do localStorage ou array vazio
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("weather_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // Grava no localStorage sempre que a lista de favoritos mudar
  useEffect(() => {
    localStorage.setItem("weather_favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Função para adicionar (evita duplicados)
  const addFavorite = (cityId) => {
    if (!cityId) return;
    setFavorites((prev) => {
      if (prev.includes(cityId)) return prev;
      return [...prev, cityId];
    });
  };

  // Função para remover
  const removeFavorite = (cityId) => {
    setFavorites((prev) => prev.filter((id) => id !== cityId));
  };

  // Função para verificar se é favorito (esta é a que o teu botão usa)
  const isFavorite = (cityId) => {
    return favorites.includes(cityId);
  };

  return (
    <WeatherContext.Provider 
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeatherContext deve ser usado dentro de um WeatherProvider");
  }
  return context;
};