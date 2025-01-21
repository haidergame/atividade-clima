import { useState } from 'react';
import './WeatherApp.css'; 

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    
    const getWeather = async (city) => {
        const apiKey = '33ef1e73908c951742f2b03bcd8dba9a';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;
        
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.statusText}`);
            }
        
            const weatherData = await response.json();
            return weatherData;
        } catch (error) {
            console.error('Erro ao obter os dados do clima:', error);
            throw error;
        }
    };
    
    const handleFetchWeather = async () => {
        try {
            const weatherData = await getWeather(city);
            setWeather(weatherData);
            setError(null);
        } catch (error) {
            setWeather(null);
            setError('Não foi possível obter a previsão do tempo.');
        }
    };
    
    return (
        <div className="weather-container">
            <h1>Previsão do Tempo</h1>
            <input
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="Digite o nome da cidade"
            />
            <button onClick={handleFetchWeather}>Buscar Clima</button>
            {weather && (
                <div>
                    <h2>{weather.name}</h2>
                    <p>Temperatura: {weather.main.temp}°C</p>
                    <p>Descrição: {weather.weather[0].description}</p>
                </div>
            )}
            {error && <div>{error}</div>}
        </div>
    );
};

export default WeatherApp;
