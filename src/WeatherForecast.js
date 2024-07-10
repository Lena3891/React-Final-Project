import React, { useState, useEffect } from "react";
import axios from "axios";
import "./WeatherForecast.css";

export default function WeatherForecast(props) {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    function handleForecastResponse(response) {
      console.log(response.data); // Debugging: API-Antwort überprüfen
      setForecast(response.data.daily); // Assuming the response contains a daily forecast array
    }

    if (props.coordinates) {
      console.log("Fetching forecast for coordinates: ", props.coordinates); // Debugging: Überprüfung der Koordinaten
      let apiKey = "8f89013d30bfc04f0f041a1bdo2t3fe7";
      let latitude = props.coordinates.lat;
      let longitude = props.coordinates.lon;
      let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${props.city}&key=${apiKey}&units=metric`; //api.shecodes.io/weather/v1/forecast?query={query}&key={key}

       https: axios
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
