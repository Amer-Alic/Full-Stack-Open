import noteService from "../services/notes";

export default function Persons({ persons, setPersons }) {
  function deletePerson(id) {
    if (window.confirm("Are you sure you want to delete this person?")) {
      noteService.remove(id);
      const data = noteService.getAll().then((response) => setPersons(response));
    }
  }

  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>
            {person.name} {person.number}
            <button
              onClick={() => {
                deletePerson(person.id);
              }}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
