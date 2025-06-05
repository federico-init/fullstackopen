import axios from "axios";

const BASE_URL = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getCountries = () => {
  const request = axios.get(BASE_URL);
  return request.then((response) => response.data);
};

export default { getCountries };
