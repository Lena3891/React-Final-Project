import React, { useState, useEffect } from "react";
import axios from "axios";

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
        <div className="row">
          {forecast.map((dailyForecast, index) => {
            if (index < 5) {
              return (
                <div className="col" key={index}>
                  <div className="WeatherForecast-day">
                    {new Date(dailyForecast.dt * 1000).toLocaleDateString(
                      "en-US",
                      { weekday: "short" }
                    )}
                  </div>
                  <div className="WeatherForecast-icon">
                    <img
                      src={`http://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}.png`}
                      alt={dailyForecast.weather[0].description}
                    />
                  </div>
                  <div className="WeatherForecast-temperatures">
                    <span className="WeatherForecast-temperature-max">
                      {Math.round(dailyForecast.temp.max)}°
                    </span>
                    <span className="WeatherForecast-temperature-min">
                      {Math.round(dailyForecast.temp.min)}°
                    </span>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    );
  } else {
    return null;
  }
}
