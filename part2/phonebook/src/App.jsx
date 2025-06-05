import { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import AddPersonForm from "./components/AddPersonForm";
import PersonsList from "./components/PersonsList";

const PERSONS_URL = "http://localhost:3001/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [filterName, setFilterName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    axios.get(PERSONS_URL).then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isPersonRegistered(newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personToAdd = {
        name: newName,
        number: newNumber,
      };
      // const updatedPersons = [...persons, personToAdd];
      // setPersons(updatedPersons);

      axios
        .post(PERSONS_URL, personToAdd)
        .then((response) => setPersons([...persons, response.data]));

      setNewName("");
      setFilterName("");
      setNewNumber("");
    }
  };

  const handleChangeName = (event) => {
    setNewName(event.target.value);
  };
  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };
  const handleChangeFilterName = (event) => {
    // I create a new variable to store the search term to avoid issues with async states
    const nameSearched = event.target.value;
    setFilterName(nameSearched);

    // filter list of persons
  };

  const isPersonRegistered = (name) => {
    return persons.some((person) => person.name === name);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterName} onChange={handleChangeFilterName} />
      <h2>Add new contact</h2>
      <AddPersonForm
        onSubmit={handleSubmit}
        valueName={newName}
        valueNumber={newNumber}
        onChangeName={handleChangeName}
        onChangeNumber={handleChangeNumber}
      />
      <h2>Numbers</h2>
      <PersonsList persons={persons} searchTerm={filterName} />
    </div>
  );
};

export default App;
