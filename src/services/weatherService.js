import { DateTime } from "luxon";

const API_KEY = "511342bb24eb550d56fd30cba7aa2306";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY}); 

    return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data) => {
    if (!data || !data.coord) {
        console.error('Missing data or coord field:', data);
        return null;
    }

    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed },
    } = data;

    const { main: details, icon } = weather[0];

    return { lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, details, icon, speed };
};
  
const formatForecastWeather = (data) => {
    let { timezone, daily, hourly } = data;

    if (!daily || !hourly) {
        console.error('Missing daily or hourly data:', data);
        return null;
    }

    daily = daily.slice(1, 6).map((d) => {
        return {
            title: formatToLocalTime(d.dt, timezone, "ccc"),
            temp: d.temp.day,
            icon: d.weather[0].icon,
        };
    });

    hourly = hourly.slice(1, 6).map((d) => {
      return {
            title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
            temp: d.temp,
            icon: d.weather[0].icon,
        };
    });

    return { timezone, daily, hourly };
};
  
const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData(
        "weather",
        searchParams
    ).then(formatCurrentWeather);

    if (!formattedCurrentWeather) {
        console.error('No current weather data:', searchParams);
        return null;
    }

    const current = await getWeatherData("weather", searchParams);
    const forecast = await getWeatherData("onecall", {
        ...searchParams,
        exclude: "current,minutely,alerts",
    });
    console.log(current); // рядок для відстеження відповіді API
    console.log(forecast); // рядок для відстеження відповіді API

    if (current.cod !== 200 || !forecast.lat || !forecast.lon) {
        throw new Error("Missing data or coord field");
    }

    const { lat, lon } = formattedCurrentWeather;

    const formattedForecastWeather = await getWeatherData("onecall", {
        lat,
        lon,
        exclude: "current, minutely, alerts",
        units: searchParams.units,
    }).then(formatForecastWeather);

    if (!formattedForecastWeather) {
        console.error('No forecast weather data:', { lat, lon, units: searchParams.units });
        return null;
    }

    return { ...formattedCurrentWeather, ...formattedForecastWeather };
};
  
const formatToLocalTime = (
    secs,
    zone,
    format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
    ) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
  
const iconUrlFromCode = (code) =>
    `http://openweathermap.org/img/wn/${code}@2x.png`;
  
export default getFormattedWeatherData;
  
export { formatToLocalTime, iconUrlFromCode };