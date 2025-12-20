import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// 1. Criação do Contexto
const WeatherContext = createContext();

// 2. Chaves para o Local Storage (para persistência)
const UNITS_STORAGE_KEY = 'weather_units';
const FAVORITES_STORAGE_KEY = 'weather_favorites';

// 3. O Componente Provider que irá envolver a sua aplicação
export function WeatherProvider({ children }) {
    
    // --- ESTADO INICIAL (Lê do localStorage) ---
    
    const [units, setUnits] = useState(() => {
        // Tenta carregar a unidade preferida ou usa 'metric' (Celsius) como padrão
        return localStorage.getItem(UNITS_STORAGE_KEY) || 'metric'; 
    });

    // 3.2. Estado para a lista de Favoritos
    const [favorites, setFavorites] = useState(() => {
        const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
        // Tenta fazer o parse do JSON guardado
        try {
            return storedFavorites ? JSON.parse(storedFavorites) : [];
        } catch (e) {
            console.error("Erro a carregar favoritos do localStorage:", e);
            return [];
        }
    });

    // --- EFEITOS (Persistência no localStorage) ---

    // Persistir as UNIDADES sempre que o estado 'units' mudar
    useEffect(() => {
        localStorage.setItem(UNITS_STORAGE_KEY, units);
    }, [units]);

    // Persistir os FAVORITOS sempre que o estado 'favorites' mudar
    useEffect(() => {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    }, [favorites]);

    // --- FUNÇÕES DE MANIPULAÇÃO ---

    // Função para alternar entre 'metric' (C) e 'imperial' (F)
    const toggleUnits = useCallback(() => {
        setUnits(prevUnits => (prevUnits === 'metric' ? 'imperial' : 'metric'));
    }, []);
    
    // Verifica se uma cidade é favorita (case-insensitive)
    const isFavorite = useCallback((city) => {
        const normalizedCity = city.trim().toLowerCase();
        return favorites.some(fav => fav.toLowerCase() === normalizedCity);
    }, [favorites]);

    // Adiciona uma cidade aos favoritos
    const addFavorite = useCallback((city) => {
        const normalizedCity = city.trim();
        if (normalizedCity && !isFavorite(normalizedCity)) {
            setFavorites(prevFavorites => [...prevFavorites, normalizedCity]);
        }
    }, [isFavorite]);

    // Remove uma cidade dos favoritos
    const removeFavorite = useCallback((city) => {
        const normalizedCity = city.trim().toLowerCase();
        setFavorites(prevFavorites => 
            prevFavorites.filter(fav => fav.toLowerCase() !== normalizedCity)
        );
    }, []);

    // --- VALOR DO CONTEXTO (o que é disponibilizado aos componentes) ---

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

// 4. Hook Customizado para usar o Contexto
// Componentes importam este hook para acederem a 'units', 'favorites', etc.
export function useWeatherContext() {
    const context = useContext(WeatherContext);
    if (context === undefined) {
        // Garante que o desenvolvedor use o hook dentro do Provider
        throw new Error('useWeatherContext deve ser usado dentro de um WeatherProvider');
    }
    return context;
}