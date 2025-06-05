const CountryData = ({ data }) => {
  const countryData = data[0];

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
    </div>
  );
};

export default CountryData;
