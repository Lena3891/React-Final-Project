import React, { useState, useEffect } from "react";
import axios from "axios";
import "./WeatherForecast.css";

export default function WeatherForecast(props) {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    function handleForecastResponse(response) {
      setForecast(response.data.daily);
    }

    if (props.coordinates) {
      const apiKey = "97f8e93f00107773f88eafd933ce86b7";
      const latitude = props.coordinates.lat;
      const longitude = props.coordinates.lon;
      let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

      axios
        .get(apiUrl)
        .then(handleForecastResponse)
        .catch((error) => {
          console.error("Error fetching forecast data: ", error);
        });
    }
  }, [props.coordinates]);

  if (forecast) {
    return (
      <div className="WeatherForecast">
        <div className="row justify-content-center">
          {forecast.slice(0, 5).map((dailyForecast, index) => (
            <div className="col-2" key={index}>
              <div className="WeatherForecast-day text-center">
                {new Date(dailyForecast.dt * 1000).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </div>
              <div className="WeatherForecast-icon">
                <img
                  src={`http://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}.png`}
                  alt={dailyForecast.weather[0].description}
                />
              </div>
              <div className="WeatherForecast-temperatures text-center">
                <span className="WeatherForecast-temperature-max">
                  {Math.round(dailyForecast.temp.max)}°
                </span>{" "}
                /{" "}
                <span className="WeatherForecast-temperature-min">
                  {Math.round(dailyForecast.temp.min)}°
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return null;
  }
}
