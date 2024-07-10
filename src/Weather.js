import React, { useState, useEffect } from "react";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";
import axios from "axios";
import "./Weather.css";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);
  const [inputCity, setInputCity] = useState(props.defaultCity);

  // Define search function
  const search = () => {
    const apiKey = "97f8e93f00107773f88eafd933ce86b7";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios
      .get(apiUrl)
      .then(handleResponse)
      .catch((error) => {
        console.error("Error fetching weather data: ", error);
      });
  };

  useEffect(() => {
    search(); // Call search function here

    // Since search is defined outside useEffect and used inside, include it in the dependency array
  }, [search, city]); // Include 'search' and 'city' in the dependency array

  function handleResponse(response) {
    setWeatherData({
      ready: true,
      coordinates: response.data.coord,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      date: new Date(response.data.dt * 1000),
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      wind: response.data.wind.speed,
      city: response.data.name,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setCity(inputCity); // Update city state with inputCity
  }

  function handleCityChange(event) {
    setInputCity(event.target.value); // Update inputCity state with input value
  }

  return (
    <div className="Weather">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-9">
            <input
              type="search"
              placeholder="Enter a city.."
              className="form-control search-input"
              value={inputCity}
              onChange={handleCityChange}
            />
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
