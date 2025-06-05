import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import AddPersonForm from "./components/AddPersonForm";
import PersonsList from "./components/PersonsList";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [filterName, setFilterName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    personsService.getAll().then((data) => setPersons(data));
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

      personsService
        .addPerson(personToAdd)
        .then((data) => setPersons([...persons, data]));

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
