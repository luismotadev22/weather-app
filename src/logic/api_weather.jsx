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
export const fetchCurrentWeather = async (input) => {
  try {
    const resList = await fetch(DISTRICTS_URL);
    if (!resList.ok) throw new Error("Erro ao carregar lista de cidades.");
    const districtsData = await resList.json();

    let city;
    const isId = !isNaN(input) && !isNaN(parseFloat(input));

    if (isId) {
      // Se for um ID, procura pelo globalIdLocal
      city = districtsData.data.find(item => String(item.globalIdLocal) === String(input));
    } else {
      // Se for texto, usa a tua lógica de normalização
      const normalizedInput = normalizeText(input);
      city = districtsData.data.find(item => normalizeText(item.local) === normalizedInput);
    }

    if (!city) throw new Error("Cidade não encontrada. Tenta novamente.");

    const id = city.globalIdLocal;
    const name = city.local;

    // Chamar o teu Backend Node
    const resWeather = await fetch(`${BACKEND_URL}/${id}`);
    if (!resWeather.ok) throw new Error("Problema ao ligar ao servidor de meteorologia.");

    const data = await resWeather.json();

    if (!data?.data || data.data.length === 0) {
      throw new Error("Previsão indisponível.");
    }

    const today = data.data[0];

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
    throw err;
  }
};