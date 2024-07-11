import React, { useState, useEffect } from "react";
import axios from "axios";
import "./WeatherForecast.css";

export default function WeatherForecast(props) {
  const [forecast, setForecast] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (props.coordinates) {
      const apiKey = "fbef01f4et1b02o0d25c27210a43ef3f";
      const { lat: latitude, lon: longitude } = props.coordinates;
      const apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${latitude}&lon=${longitude}&key=${apiKey}&units=metric`;

      axios
        .get(apiUrl)
        .then((response) => {
          console.log(response.data); // Debugging: API-Antwort überprüfen
          if (response.data && response.data.daily) {
            setForecast(response.data.daily);
            setLoaded(true);
          } else {
            console.error("Unexpected response structure:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching forecast data:", error);
        });
    }
  }, [props.coordinates]);

  if (!loaded) {
    return <div>Loading...</div>; // Sicherstellen, dass etwas zurückgegeben wird, wenn nicht geladen
  }

  if (loaded && forecast) {
    return (
      <div className="WeatherForecast">
        <div className="row justify-content-center">
          {forecast.slice(0, 5).map((dailyForecast, index) => (
            <div className="col-2" key={index}>
              <div className="WeatherForecast-day text-center">
                {new Date(dailyForecast.time * 1000).toLocaleDateString(
                  "en-US",
                  {
                    weekday: "short",
                  }
                )}
              </div>
              <div className="WeatherForecast-icon">
                <img
                  src={dailyForecast.condition.icon_url}
                  alt={dailyForecast.condition.description}
                />
              </div>
              <div className="WeatherForecast-temperatures text-center">
                <span className="WeatherForecast-temperature-max">
                  {dailyForecast.temp && Math.round(dailyForecast.temp.maximum)}
                  °
                </span>{" "}
                /{" "}
                <span className="WeatherForecast-temperature-min">
                  {dailyForecast.temp && Math.round(dailyForecast.temp.minimum)}
                  °
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
