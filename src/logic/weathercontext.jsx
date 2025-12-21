import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// 1️⃣ Criação do Contexto
const WeatherContext = createContext();

// 2️⃣ Chaves para o Local Storage
const UNITS_STORAGE_KEY = 'weather_units';
const FAVORITES_STORAGE_KEY = 'weather_favorites';

// 3️⃣ Provider
export function WeatherProvider({ children }) {

    // --- Estado para unidades
    const [units, setUnits] = useState(() => {
        return localStorage.getItem(UNITS_STORAGE_KEY) || 'metric';
    });

    // --- Estado para favoritos (como objetos {id, name})
    const [favorites, setFavorites] = useState(() => {
        const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
        try {
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error("Erro ao carregar favoritos do localStorage:", e);
            return [];
        }
    });

    // --- Persistência
    useEffect(() => {
        localStorage.setItem(UNITS_STORAGE_KEY, units);
    }, [units]);

    useEffect(() => {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    }, [favorites]);

    // --- Funções ---
    const toggleUnits = useCallback(() => {
        setUnits(prev => (prev === 'metric' ? 'imperial' : 'metric'));
    }, []);

    // Verifica se a cidade já está nos favoritos pelo id
    const isFavorite = useCallback((city) => {
        if (!city || !city.id) return false;
        return favorites.some(fav => fav.id === city.id);
    }, [favorites]);

    // Adiciona cidade aos favoritos
    const addFavorite = useCallback((city) => {
        if (!city || !city.id) return;
        if (!isFavorite(city)) {
            setFavorites(prev => [...prev, { id: city.id, name: city.name }]);
        }
    }, [isFavorite]);

    // Remove cidade dos favoritos pelo id
    const removeFavorite = useCallback((city) => {
        if (!city || !city.id) return;
        setFavorites(prev => prev.filter(fav => fav.id !== city.id));
    }, []);

    // --- Context value
    const contextValue = {
        units,
        toggleUnits,
        favorites,
        isFavorite,
        addFavorite,
        removeFavorite,
    };

    return (
        <WeatherContext.Provider value={contextValue}>
            {children}
        </WeatherContext.Provider>
    );
}

// 4️⃣ Hook customizado
export function useWeatherContext() {
    const context = useContext(WeatherContext);
    if (!context) {
        throw new Error('useWeatherContext deve ser usado dentro de um WeatherProvider');
    }
    return context;
}