import React from "react";

import { fetchWeather } from "./api/fetchWeather";
import { fetchVenues } from "./api/fetchVenues";
//import { Venues } from "./venues.component";
import "./styles.css";

const Venue = (props) => {
  const place = props.venues.map((venue) => {
    return (
      <div className="venue-container">
        <h2 className="venue-title">{venue.name}</h2>
        <img
          alt=""
          src={
            venue === {} ? "" : `${venue.categories[0].icon.prefix}bg_64.png`
          }
        />
        <p className="venue-info">
          <em>Address: </em>
          {venue.location.address ? venue.location.address : "Unknown"}
        </p>
        <p className="venue-info">
          <em>{venue.location.state} </em>
          {venue.location.country}
        </p>
      </div>
    );
  });
  return place;
};

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      query: "",
      weather: {},
      venues: [],
    };
  }

  search = async (e) => {
    if (e.key === "Enter") {
      //const ll = `${data.coord.lat}${data.coord.lon}`;
      const data = await fetchWeather(this.state.query);
      //const city = data.name ? data.name : this.state.query;
      const location = `${data.coord.lat},${data.coord.lon}`;
      const dataVenue = await fetchVenues(location);
      console.log(location);

      this.setState({
        weather: data,
        venues: dataVenue,
        query: "",
      });
    }
  };
  render() {
    const weather = this.state.weather;
    const venues = this.state.venues;

    return (
      <div className="main-container">
        <nav className="nav">Wanderlust</nav>
        <div className="search-wrap">
          <h1 className="main-title">Where do you want to land?</h1>
          <input
            type="text"
            className="search"
            placeholder="Search by city..."
            value={this.state.query}
            onChange={(e) => this.setState({ query: e.target.value })}
            onKeyPress={this.search}
          />
        </div>
        <div className="wrap">
          {weather.main && (
            <div className="city">
              <h2 className="city-name">
                <span>{weather.name}</span>
                <sup>{weather.sys.country}</sup>
              </h2>
              <h1 className="current-weather">Current weather</h1>
              <div className="city-temp">
                {Math.round(weather.main.temp)}
                <sup>&deg;C</sup>
              </div>
              <div className="info">
                <img
                  className="city-icon"
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                />
                <p>{weather.weather[0].description}</p>
              </div>
            </div>
          )}
        </div>
        <h1 className={venues[0] ? "show" : "hidden"}>Top Attractions</h1>
        <div className="venues">
          <Venue key={venues.map((venue) => venue.id)} venues={venues}></Venue>
        </div>
      </div>
    );
  }
}

export default App;
