import React from "react";
import './App.css';
import Weather from "./Weather";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <Weather />
        <footer>
          This project was coded by Magdalena Zyglewicz and is{" "}
          <a
            href="https://github.com/Lena3891/react-week-5"
            rel="noreferrer"
             target="_blank"
          >
            open-sourced on GitHub
          </a>
        </footer>
      </div>
    </div>
  );
}

 
