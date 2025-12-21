export const weatherTypeMap = {
  1: { label: "Céu Limpo", icon: "☀️", color: "#FFD93B" },
  2: { label: "Poucas Nuvens", icon: "🌤️", color: "#FFD93B" },
  3: { label: "Meia Nuvem", icon: "⛅", color: "#FFB84C" },
  4: { label: "Nublado", icon: "☁️", color: "#B0BEC5" },
  5: { label: "Chuvisco", icon: "🌦️", color: "#4FC3F7" },
  6: { label: "Chuva Fraca", icon: "🌧️", color: "#29B6F6" },
  7: { label: "Chuva Moderada", icon: "🌧️", color: "#0288D1" },
  8: { label: "Chuva Forte", icon: "🌧️⚡", color: "#01579B" },
  9: { label: "Trovoada", icon: "⛈️", color: "#6D4C41" },
  10: { label: "Granizo", icon: "🌨️", color: "#90A4AE" },
  11: { label: "Neve", icon: "❄️", color: "#B3E5FC" },
  12: { label: "Neblina", icon: "🌫️", color: "#CFD8DC" },
};

/**
 * Exemplo de uso:
 * 
 * import { weatherTypeMap } from "../constants/weatherTypeMap";
 * 
 * const weather = weatherTypeMap[today.weatherTypeId];
 * console.log(weather.icon, weather.label, weather.color);
 */
