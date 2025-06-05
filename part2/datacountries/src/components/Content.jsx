import CountryData from "./CountryData";

const Content = ({ content }) => {
  if (!content.length) return null;

  if (content.length > 10) {
    return <p>Too many matches specify another filter</p>;
  }

  if (content.length > 1) {
    return (
      <ul>
        {content &&
          content.map((country) => (
            <li key={country.name.official}>{country.name.common}</li>
          ))}
      </ul>
    );
  }

  return <CountryData data={content} />;
};

export default Content;
