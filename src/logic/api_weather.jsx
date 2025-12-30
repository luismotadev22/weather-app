const DISTRICTS_URL = "/districts-islands.json"; 
const BACKEND_URL = "http://localhost:3001/weather"; 

// Normaliza texto (remove acentos e maiúsculas)
const normalizeText = (text) =>
  text
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

/**
 * Obter ID da cidade pelo nome no JSON local
 */
export const getCityId = async (cityName) => {
  if (!cityName) throw new Error("Nome da cidade é obrigatório");

  try {
    const res = await fetch(DISTRICTS_URL);
    if (!res.ok) throw new Error("Não foi possível carregar a lista de cidades local.");

    const data = await res.json();
    const normalizedInput = normalizeText(cityName);

    // No teu JSON, os dados estão dentro de data.data
    const city = data.data.find(
      (item) => normalizeText(item.local) === normalizedInput
    );

    if (!city) throw new Error("Cidade não encontrada. Tenta novamente.");

    return { id: city.globalIdLocal, name: city.local };
  } catch (err) {
    console.error("Erro em getCityId:", err.message);
    throw err;
  }
};

/**
 * Obter previsão meteorológica ligando ao Backend Node
 */
export const fetchCurrentWeather = async (cityName) => {
  try {
    // 1. Obter o ID
    const { id, name } = await getCityId(cityName);
    
    // 2. Chamar o Backend
    const res = await fetch(`${BACKEND_URL}/${id}`);

    // 3. Se o status não for 200 (OK), tratar erro
    if (!res.ok) {
      const errorText = await res.text(); // Usamos text() caso o servidor não envie JSON no erro
      console.error(`Erro do Servidor (${res.status}):`, errorText);
      throw new Error(`Erro ${res.status}: Problema ao ligar ao IPMA.`);
    }

    const data = await res.json();

    // 4. Validar se o IPMA enviou a lista de previsão
    if (!data?.data || data.data.length === 0) {
      throw new Error("Previsão indisponível para esta localização.");
    }

    const today = data.data[0];

    // 5. Retornar apenas o necessário
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
    console.error("Erro em fetchCurrentWeather:", err.message);
    throw err; // Lança para o componente SearchBar tratar
  }
};