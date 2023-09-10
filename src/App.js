import "./App.css";
import CurrentWeather from "./component/CurrentWeather/CurrentWeather";
import Search from "./component/Search";
import { CURRENT_WEATHER_API, CURRENT_WEATHER_KEY } from "./component/api";
import { useState } from "react";
import Forecast from "./component/forecast/Forecast";
function App() {
  const [currentWeather, setCureentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);
  const handleonSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const cureentWeatherFetch = fetch(
      `${CURRENT_WEATHER_API}/weather?lat=${lat}&lon=${lon}&appid=${CURRENT_WEATHER_KEY}&units=metric`
    );
    const forcastFetch = fetch(
      `${CURRENT_WEATHER_API}/forecast?lat=${lat}&lon=${lon}&appid=${CURRENT_WEATHER_KEY}&units=metric`
    );
    Promise.all([cureentWeatherFetch, forcastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        setCureentWeather({ city: searchData.label, ...weatherResponse });
        setForecastWeather({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };
  console.log(currentWeather);
  console.log(forecastWeather);
  return (
    <div className="App">
      <div className="container">
        <Search onSearchChange={handleonSearchChange}></Search>
        {currentWeather && <CurrentWeather data={currentWeather} />}
        {forecastWeather && <Forecast data={forecastWeather}></Forecast>}
      </div>
    </div>
  );
}

export default App;
