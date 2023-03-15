import './App.css';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from "./services/weatherService";
import React, { useEffect, useState } from "react";

function App() {
    const [query, setQuery] = useState({q: "Paris"});
    const [units, setUnits] = useState("metric");
    const [weather, setWeather] = useState(null);

    const apiKey = "your_api_key";

fetch(`http://api.openweathermap.org/data/2.5/weather?q=Paris&units=metric&appid=${apiKey}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error("Error fetching weather data:", error);
  });

    useEffect(() => {
        const fetchWeather = async () => {
            const data = await getFormattedWeatherData({ ...query, units });
            setWeather(data);
        };
        
        fetchWeather();
    }, [query, units]);    

    const formatBackground = () => {
        if(!weather) return 'from-gray-300 to-sky-300'
        const threshold = units === 'metric' ? 20 : 60 
        if (weather.temp <= threshold) return 'from-gray-300 to-sky-300'

        return 'from-gray-300 to-amber-400'
    }

    return (
        <div className={`mx-auto md:h-full sm:flex-auto py-5 px-2 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
            <TopButtons setQuery={setQuery} />
            <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
            {weather && (
                <div>
                    <TimeAndLocation weather={weather} />
                    <TemperatureAndDetails weather={weather} />
                    <Forecast title="hourly forecast" items={weather.hourly} />
                    <Forecast title="daily forecast" items={weather.daily} />
                </div>
            )}
        </div>
    );
}

export default App;