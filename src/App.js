import React, { useState, useEffect } from "react";
import axios from "axios";

import { fetchWeather, error, URL, API_KEY } from "./api/fetchWeather";
import { fetchVenues } from "./api/fetchVenues";

import useSticky from "./hook/useSticky";
import Header from "./components/header-component";
import Weather from "./components/weather-component";
import Options from "./components/options-component";
import Venue from "./components/venues.component";
import Spinner from "./components/spinner-component";
import Footer from "./components/footer-component";
import "./main.scss";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("topPicks");
  const [weather, setWeather] = useState({});
  const [venues, setVenues] = useState([]);
  const { isSticky, element } = useSticky();

  useEffect(() => {
    const getCurrentLocation = async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      const { data } = await axios.get(URL, {
        params: {
          lat: lat,
          lon: lon,
          APPID: API_KEY,
        },
      });

      const currentCity = data.name;
      setQuery(currentCity);
      setIsLoading(true);
      const dataWeather = await fetchWeather(currentCity);
      const location = `${dataWeather.coord.lat},${dataWeather.coord.lon}`;
      const dataVenue = await fetchVenues(location, "topPicks");

      setWeather(dataWeather);
      setVenues(dataVenue);
      setIsLoading(false);
    };

    navigator.geolocation.getCurrentPosition(getCurrentLocation, error);
  }, []);

  const search = async (e) => {
    if (e.key === "Enter") {
      setIsLoading(true);
      const data = await fetchWeather(query);
      const location = `${data.coord.lat},${data.coord.lon}`;
      const dataVenue = await fetchVenues(location, category);

      setWeather(data);
      setVenues(dataVenue);
      setIsLoading(false);
    }
  };

  const searchByCategory = async (e) => {
    if (query !== "") {
      const currentCategory = e.target.value;
      setCategory(currentCategory);
      setIsLoading(true);

      const dataWeather = await fetchWeather(query);
      const location = `${dataWeather.coord.lat},${dataWeather.coord.lon}`;
      const dataVenue = await fetchVenues(location, currentCategory);

      setWeather(dataWeather);
      setVenues(dataVenue);
      setIsLoading(false);
    } else {
      alert("You need to specify a city");
    }
  };

  const queryHandler = (e) => setQuery(e.target.value);

  return (
    <div className="main-container">
      <Header
        onKeyPressHandler={search}
        queryHandler={queryHandler}
        value={query}
      ></Header>

      {isLoading ? <Spinner /> : ""}

      {weather.main && <Weather sticky={isSticky} weather={weather}></Weather>}
      {weather.main && (
        <Options
          element={element}
          category={category}
          handler={searchByCategory}
          isLoading={isLoading}
        ></Options>
      )}
      {weather.main && !isLoading && (
        <div className="venues">
          <Venue venues={venues}></Venue>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default App;
