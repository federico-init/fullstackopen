import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isPersonRegistered(newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personToAdd = {
        name: newName,
        number: newNumber,
      };
      setPersons([...persons, personToAdd]);
      setNewName("");
      setNewNumber();
    }
  };

  const handleChangeName = (event) => {
    setNewName(event.target.value);
  };
  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const isPersonRegistered = (name) => {
    return persons.some((person) => person.name === name);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:
          <input type="text" value={newName} onChange={handleChangeName} />
        </div>
        <div>
          number:
          <input
            type="number"
            value={newNumber}
            onChange={handleChangeNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
};

export default App;
