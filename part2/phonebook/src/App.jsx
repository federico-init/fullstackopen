import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [newName, setNewName] = useState("");
  const [filterName, setFilterName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isPersonRegistered(newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personToAdd = {
        id: persons.length + 1,
        name: newName,
        number: newNumber,
      };
      const updatedPersons = [...persons, personToAdd];
      setPersons(updatedPersons);
      setFilteredPersons(updatedPersons);
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
    setFilteredPersons(
      persons.filter((person) =>
        person.name.toLowerCase().includes(nameSearched.toLowerCase())
      )
    );
  };

  const isPersonRegistered = (name) => {
    return persons.some((person) => person.name === name);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Search person
        <input
          type="text"
          value={filterName}
          onChange={handleChangeFilterName}
        />
      </div>
      <h2>Add new contact</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:
          <input type="text" value={newName} onChange={handleChangeName} />
        </div>
        <div>
          number:
          <input type="text" value={newNumber} onChange={handleChangeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
};

export default App;
