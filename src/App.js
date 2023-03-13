import './App.css';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from "./services/weatherService";
import { useEffect, useState } from "react";

function App() {
    const [query, setQuery] = useState({q: "kyiv"});
    const [units, setUnits] = useState("metric");
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            await getFormattedWeatherData(...query, units).then(data => {
                setWeather(data);
            });
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
        <div className={`mx-auto md:h-fulll sm:flex-auto py-5 px-2 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
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