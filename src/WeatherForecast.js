import React, { useState, useEffect } from "react";
import axios from "axios";
import "./WeatherForecast.css";

export default function WeatherForecast(props) {
  const [forecast, setForecast] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (props.coordinates) {
      const apiKey = "fbef01f4et1b02o0d25c27210a43ef3f";
      const { lat, lon } = props.coordinates;
      const apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${lat}&lon=${lon}&key=${apiKey}&units=metric`;

      axios
        .get(apiUrl)
        .then((response) => {
          console.log(response.data); // Debugging: API-Antwort überprüfen
          setForecast(response.data.daily);
          setLoaded(true);
        })
        .catch((error) => {
          console.error("Error fetching forecast data: ", error);
        });
    }
  }, [props.coordinates]);

  if (loaded && forecast) {
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
