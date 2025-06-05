const PersonsList = ({ persons, searchTerm, onDelete }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {filteredPersons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number} {""}
          <button onClick={() => onDelete(person)}>Delete</button>
        </div>
      ))}
    </>
  );
};

export default PersonsList;
