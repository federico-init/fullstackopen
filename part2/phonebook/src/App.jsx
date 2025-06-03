import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isPersonRegistered(newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personToAdd = {
        name: newName,
      };
      setPersons([...persons, personToAdd]);
      setNewName("");
    }
  };

  const handleChangeName = (event) => {
    setNewName(event.target.value);
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
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.name}>{person.name}</div>
      ))}
    </div>
  );
};

export default App;
