import React from 'react';
import { FaWind, FaTint, FaThermometerHalf, FaSun, FaCloud, FaBolt, FaSnowflake } from 'react-icons/fa';
// Importar o WeatherIcon, se já o tiver criado.

// O componente recebe os dados já limpos e formatados do CityDetailPage
function CurrentWeatherCard({ data }) {
    if (!data) return null;

    const { 
        // Desestruturação dos dados recebidos
        temp, 
        feels_like, 
        description, 
        humidity, 
        wind_speed, 
        unitSymbol 
    } = data;

    // Função simples (placeholder) para mapear a descrição para um ícone
    const getWeatherIcon = (desc) => {
        // Lógica muito simples (será refinada mais tarde)
        if (desc.toLowerCase().includes('chuva')) return <FaTint size={40} />;
        if (desc.toLowerCase().includes('sol') || desc.toLowerCase().includes('clear')) return <FaSun size={40} />;
        if (desc.toLowerCase().includes('nuvens') || desc.toLowerCase().includes('clouds')) return <FaCloud size={40} />;
        if (desc.toLowerCase().includes('trovoada')) return <FaBolt size={40} />;
        if (desc.toLowerCase().includes('neve')) return <FaSnowflake size={40} />;
        return <FaThermometerHalf size={40} />;
    };

    return (
        <section className="weather-card">
            <header className="card-header">
                {getWeatherIcon(description)}
                {/* Requisito: Mostrar Temperatura Atual */}
                <h2 className="current-temp">
                    {temp}{unitSymbol}
                </h2>
                <p className="description">{description}</p>
            </header>

            <div className="card-details">
                {/* Requisito: Mostrar Sensação Térmica */}
                <div className="detail-item">
                    <FaThermometerHalf />
                    <span>Sensação Térmica:</span>
                    <strong>{feels_like}{unitSymbol}</strong>
                </div>
                
                {/* Requisito: Mostrar Humidade */}
                <div className="detail-item">
                    <FaTint />
                    <span>Humidade:</span>
                    <strong>{humidity}%</strong>
                </div>
                
                {/* Requisito: Mostrar Velocidade do Vento */}
                <div className="detail-item">
                    <FaWind />
                    <span>Vento:</span>
                    {/* Nota: O OpenWeatherMap API devolve m/s por defeito no modo 'metric' */}
                    <strong>{wind_speed} m/s</strong> 
                </div>

                {/* Mostrar Max/Min do dia */}
                <div className="detail-item">
                    <span>Máx/Mín:</span>
                    <strong>{data.temp_max}/{data.temp_min}{unitSymbol}</strong>
                </div>
            </div>
        </section>
    );
}

export default CurrentWeatherCard;