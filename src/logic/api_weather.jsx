export const fetchCurrentWeather = async (city) => {
  return {
    name: city || "Lisboa",
    sys: { country: "PT" },
    main: {
      temp: 20,
      feels_like: 18,
      humidity: 50,
      temp_max: 22,
      temp_min: 15
    },
    wind: { speed: 12 },
    weather: [{ description: "céu limpo", icon: "01d" }]
  };
};