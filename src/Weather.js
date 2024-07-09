import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";
import FormattedDate from "./FormattedDate";
import FormattedData from "./FormattedData";

export default function Weather() {
  const [ready, setReady] = useState(false);
  const [weatherData, setWeatherData] = useState({});

  function handleResponse(response) {
    setWeatherData({
      date: new Date(response.data.time * 1000), // Assuming the API returns a Unix timestamp
      temperature: Math.round(response.data.temperature.current),
      humidity: response.data.temperature.humidity,
      feels_like: Math.round(response.data.temperature.feels_like),
      pressure: response.data.temperature.pressure,
      description: response.data.condition.description,
      iconUrl: response.data.condition.icon_url, // Dynamische Icon-URL aus der API
      city: response.data.city,
    });
    setReady(true);
  }

  if (ready) {
    return (
      <div className="Weather">
        <form>
          <div className="row">
            <div className="col-9">
              <input
                type="search"
                placeholder="Ort suchen"
                className="form-control"
                autoFocus="on"
              />
            </div>
            <div className="col-3">
              <input
                type="submit"
                value="Search"
                className="btn btn-primary w-100"
              />
            </div>
          </div>
        </form>
        <h1>{weatherData.city}</h1>
        <ul>
          <li>
            <FormattedDate date={weatherData.date} />
          </li>
          <li>{weatherData.description}</li>
        </ul>
        <div className="row mt-3">
          <div className="col-6">
            <div className="temperature-container">
              <img
                src={weatherData.iconUrl}
                alt={weatherData.description}
                className="weather-icon"
              />
              <div className="temperature-details">
                <span className="temperature">{weatherData.temperature}</span>
                <span className="unit">°C</span>
              </div>
            </div>
          </div>
          <div className="col-6">
            <ul>
              <li>Humidity: {weatherData.humidity}%</li>
              <li>Feels like: {weatherData.feels_like}°C</li>
              <li>Pressure: {weatherData.pressure} hPa</li>
              <li>Wind: 8 km/h</li>
            </ul>
          </div>
        </div>
        <FormattedData
          date={weatherData.date.toString()}
          description={weatherData.description}
          icon={weatherData.iconUrl}
        />
      </div>
    );
  } else {
    const apiKey = "8f89013d30bfc04f0f041a1bdo2t3fe7";
    let city = "Neuburg an der Donau";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;
    axios.get(apiUrl).then(handleResponse);

    return "Loading...";
  }
}
