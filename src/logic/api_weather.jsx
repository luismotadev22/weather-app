const DISTRICTS_URL = "/districts-islands.json"; // JSON local com todas as cidades
const BACKEND_URL = "http://localhost:3001/weather"; // Node.js backend

// Normaliza texto (remove acentos e maiúsculas)
const normalizeText = (text) =>
  text
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

/**
 * Obter ID da cidade pelo nome
 */
export const getCityId = async (cityName) => {
  if (!cityName) throw new Error("Nome da cidade é obrigatório");

  try {
    const res = await fetch(DISTRICTS_URL);
    if (!res.ok) throw new Error("Erro ao carregar lista de cidades");

    const data = await res.json();
    const normalizedInput = normalizeText(cityName);

    const city = data.data.find(
      (item) => normalizeText(item.local) === normalizedInput
    );

    if (!city) throw new Error("Cidade não encontrada em Portugal");

    return { id: city.globalIdLocal, name: city.local };
  } catch (err) {
    console.error("getCityId error:", err);
    throw err;
  }
};

/**
 * Obter previsão meteorológica pelo nome da cidade
 */
export const fetchCurrentWeather = async (cityName) => {
  try {
    // 1️⃣ Obter ID da cidade
    const { id, name } = await getCityId(cityName);

    // 2️⃣ Chamar backend Node.js, que busca dados atualizados do IPMA
    const res = await fetch(`${BACKEND_URL}/${id}`);
    if (!res.ok) throw new Error("Erro ao carregar previsão");

    const data = await res.json();

    if (!data?.data || data.data.length === 0)
      throw new Error("Dados meteorológicos indisponíveis");

    const today = data.data[0];

    // 3️⃣ Retornar objeto limpo para o frontend
    return {
      city: name,
      cityId: id,
      date: today.forecastDate,
      tempMin: today.tMin,
      tempMax: today.tMax,
      rainProbability: today.precipitaProb,
      weatherTypeId: today.idWeatherType,
      windSpeedClass: today.classWindSpeed,
    };
  } catch (err) {
    console.error("fetchCurrentWeather error:", err);
    throw err;
  }
};