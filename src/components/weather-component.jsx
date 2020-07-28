import React from "react";

import "./weather.styles.scss";

const Weather = ({ weather, sticky }) => {
  return (
    <div className={`city ${sticky ? "sticky" : ""}`}>
      <h2 className="city-name">
        <span>{weather.name}</span>
        <sup>{weather.sys.country}</sup>
      </h2>
      <h2 className="current-weather">Current weather</h2>
      <div className="city-temp">
        {Math.round(weather.main.temp)}
        <sup>&deg;C</sup>
      </div>
      <div className="info">
        <img
          className="city-icon"
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
          alt={weather.weather[0].description}
        />
        <p className="info__desc">{weather.weather[0].description}</p>
      </div>
    </div>
  );
};

export default Weather;
