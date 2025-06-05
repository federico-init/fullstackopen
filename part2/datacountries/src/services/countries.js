import axios from "axios";

const BASE_URL = "https://studies.cs.helsinki.fi/restcountries/api/all";
const API_KEY = import.meta.env.VITE_API_KEY;

const getCountries = () => {
  const request = axios.get(BASE_URL);
  return request.then((response) => response.data);
};

const getCountryWeather = (lat, lon) => {
  const request = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  return request.then((response) => response.data);
};

export default { getCountries, getCountryWeather };
