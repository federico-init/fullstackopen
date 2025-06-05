import { useState } from "react";
import SearchForm from "./components/SearchForm";
import countriesService from "./services/countries";
import Content from "./components/Content";

const App = () => {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    countriesService.getCountries().then((data) => {
      const filteredData = data.filter((country) =>
        country.name.common.toLowerCase().includes(searchValue.toLowerCase())
      );
      setData(filteredData);
    });
  };
  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div>
      <SearchForm
        onSubmit={handleSubmit}
        onChange={handleChange}
        value={searchValue}
      />
      <Content content={data} searchValue={searchValue} />
    </div>
  );
};

export default App;
