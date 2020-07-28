import axios from "axios";

export const URL = "https://api.openweathermap.org/data/2.5/weather";
export const API_KEY = "12ae2b3301ca136091052e17bb7cf34b";

export const fetchWeather = async (query) => {
  const { data } = await axios.get(URL, {
    params: {
      q: query,
      units: "metric",
      APPID: API_KEY,
    },
  });
  return data;
};

export const error = (err) => {
  console.warn("ERROR(" + err.code + "): " + err.message);
};
