import { useEffect, useState } from "react";
import countriesService from "../services/countries";

const CountryData = ({ data }) => {
  const countryData = data[0];
  const lat = countryData.latlng[0];
  const lon = countryData.latlng[1];

  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    countriesService
      .getCountryWeather(lat, lon)
      .then((response) => setWeatherData(response));
  }, [data]);

  return (
    <div>
      <h1>{countryData.name.common}</h1>
      <p>Capital: {countryData.capital}</p>
      <p>Area: {countryData.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(countryData.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={countryData.flags.png} alt={countryData.flags.alt} />
      <h2>Weather in {countryData.name.common}</h2>
      <p>Temperature {weatherData?.main.temp} Celsius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`}
        alt=""
      />
      <p>Wind {weatherData?.wind.speed} m/s</p>
    </div>
  );
};

export default CountryData;
