import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import AddPersonForm from "./components/AddPersonForm";
import PersonsList from "./components/PersonsList";
import personsService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [filterName, setFilterName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("success");

  useEffect(() => {
    personsService.getAll().then((data) => setPersons(data));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const foundId = isPersonRegistered(newName);

    if (foundId) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        manageRegisteredPerson({
          id: foundId,
          name: newName,
          number: newNumber,
        });
      } else return;
    } else {
      const personToAdd = {
        name: newName,
        number: newNumber,
      };

      personsService.addPerson(personToAdd).then((data) => {
        setPersons([...persons, data]);
        setNotificationType("success");
        setNotificationMessage(`${data.name} added to phonebook!`);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 3000);
        setNewName("");
        setFilterName("");
        setNewNumber("");
      });
    }
  };

  const handleDelete = (personObject) => {
    if (
      window.confirm(`Are you sure you want to delete ${personObject.name}?`)
    ) {
      personsService
        .deletePerson(personObject.id)
        .then(() =>
          setPersons(persons.filter((person) => person.id !== personObject.id))
        )
        .catch((error) => {
          setNotificationType("error");
          setNotificationMessage(
            `${personObject.name} data is no longer available`
          );
          setTimeout(() => {
            setNotificationMessage(null);
          }, 3000);
        });
    } else return;
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
    const personFound = persons.find(
      (person) => person.name.toLowerCase() === name.toLowerCase()
    );

    return personFound?.id;
  };

  const manageRegisteredPerson = (personToUpdate) => {
    personsService
      .updatePerson(personToUpdate)
      .then((data) => {
        setPersons(
          persons.map((person) =>
            person.id === personToUpdate.id ? data : person
          )
        );
        setNotificationType("success");
        setNotificationMessage(`${data.name}'s number updated!`);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 3000);
        setNewName("");
        setFilterName("");
        setNewNumber("");
      })
      .catch((error) => {
        setNotificationType("error");
        setNotificationMessage(
          `${personToUpdate.name} data is no longer available`
        );
        setTimeout(() => {
          setNotificationMessage(null);
        }, 3000);
      });
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
      <PersonsList
        persons={persons}
        searchTerm={filterName}
        onDelete={handleDelete}
      />
      <Notification content={notificationMessage} type={notificationType} />
    </div>
  );
};

export default App;
