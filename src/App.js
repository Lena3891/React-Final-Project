import React from "react";
import Weather from "./Weather";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <Weather defaultCity="Neuburg an der Donau" />
      </div>
      <div>
        <footer>
          This project was coded by Magdalena Zyglewicz and is open-sourced on{" "}
          <a
            href="https://github.com/Lena3891/React-Week-5"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>{" "}
          and hosted on{" "}
          <a
            href="https://react-final-project-weather.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Netlify
          </a>
        </footer>
      </div>
    </div>
  );
}
