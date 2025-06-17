import axios from "axios";

const PERSONS_URL = "api/persons";

const getAll = () => {
  const request = axios.get(PERSONS_URL);
  return request.then((response) => response.data);
};

const addPerson = (personObject) => {
  const request = axios.post(PERSONS_URL, personObject);
  return request.then((response) => response.data);
};

const deletePerson = (personId) => {
  const request = axios.delete(`${PERSONS_URL}/${personId}`);
  return request.then((response) => response.data);
};

const updatePerson = (personObject) => {
  const request = axios.put(`${PERSONS_URL}/${personObject.id}`, personObject);
  return request.then((response) => response.data);
};

export default {
  getAll,
  addPerson,
  deletePerson,
  updatePerson,
};
