import React, { useState, useEffect, useCallback } from "react";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";
import axios from "axios";
import "./Weather.css";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);
  const [inputCity, setInputCity] = useState(props.defaultCity);

  const search = useCallback(() => {
    let apiKey = "fbef01f4et1b02o0d25c27210a43ef3f";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    axios
      .get(apiUrl)
      .then(handleResponse)
      .catch((error) => {
        console.error("Error fetching weather data: ", error);
      });
  }, [city]);

  useEffect(() => {
    search(); // Call search function here
  }, [search]); // Include 'search' in the dependency array

  function handleResponse(response) {
    console.log("API response:", response.data); // Konsolenausgabe zur Überprüfung der API-Antwort

    setWeatherData({
      ready: true,
      coordinates: response.data.coordinates,
      temperature: response.data.temperature.current,
      humidity: response.data.temperature.humidity,
      date: new Date(response.data.time * 1000),
      description: response.data.condition.description,
      icon: response.data.condition.icon, // Verwenden Sie den Code für ReactAnimatedWeather
      icon_url: response.data.condition.icon_url, // Verwenden Sie die URL für direkte Bildanzeige
      wind: response.data.wind.speed,
      city: response.data.city,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setCity(inputCity); // Update city state with inputCity
  }

  function handleCityChange(event) {
    setInputCity(event.target.value); // Update inputCity state with input value
  }
  function clearInput() {
    setInputCity("");
  }

  return (
    <div className="Weather">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-9">
            <div className="input-group">
              <input
                type="search"
                placeholder="Enter a city.."
                className="form-control search-input"
                value={inputCity}
                onChange={handleCityChange}
              />
             
            </div>
          </div>
          <div className="col-3">
            <button type="submit" className="btn btn-primary w-100">
              Search
            </button>
          </div>
        </div>
      </form>
      {weatherData.ready ? (
        <>
          <WeatherInfo data={weatherData} />
          <WeatherForecast coordinates={weatherData.coordinates} />
        </>
      ) : (
        <div className="Weather-loading">Loading...</div>
      )}
    </div>
  );
}