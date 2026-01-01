import React, { createContext, useContext, useState, useEffect } from "react";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("weather_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("weather_favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Agora aceita um objeto: { id: "1110600", name: "Lisboa" }
  const addFavorite = (cityObj) => {
    if (!cityObj || !cityObj.id) return;
    
    setFavorites((prev) => {
      // Verifica se o ID já existe na lista de objetos
      const exists = prev.find((item) => String(item.id) === String(cityObj.id));
      if (exists) return prev;
      return [...prev, cityObj];
    });
  };

  const removeFavorite = (cityId) => {
    setFavorites((prev) => prev.filter((item) => String(item.id) !== String(cityId)));
  };

  const isFavorite = (cityId) => {
    // Procura o ID dentro da lista de objetos
    return favorites.some((item) => String(item.id) === String(cityId));
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
  if (!context) throw new Error("useWeatherContext deve ser usado dentro de WeatherProvider");
  return context;
};