import { useEffect, useState } from "react";
import axios from "axios";
import PersonsForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import noteService from "./services/notes";
import { getActiveElement } from "@testing-library/user-event/dist/utils";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState(persons);
  const [notfMessage, setNotfMessage] = useState(null);

  useEffect(() => {
    noteService.getAll().then((response) => setPersons(response));
  }, []);

  if (persons === null) return;

  function handleNameSubmit(e) {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    for (let person of persons) {
      if (person.name === newPerson.name) {
        if (window.confirm(`${newPerson.name} is already in the phone book. Do you want to change their number`)) {
          const person = persons.find((person) => {
            return person.name === newPerson.name;
          });

          noteService
            .update({ ...person, number: newNumber }, person.id)
            .then((response) =>
              setPersons(
                persons.map((e) => {
                  return e.id !== person.id ? e : response;
                })
              )
            )
            .catch((error) => {
              setNotfMessage(`${person.name} was already deleted from the server`);
              setTimeout(() => {
                setNotfMessage(null);
              }, 5000);
              setPersons(persons.filter((element) => element !== person.id));
            });
          setNotfMessage(`Number of ${person.name} was changed`);
          setTimeout(() => {
            setNotfMessage(null);
          }, 5000);
        }
        return;
      }
    }
    noteService.create(newPerson);
    setPersons(persons.concat(newPerson));
    setNotfMessage(`${newPerson.name} was added`);
    setTimeout(() => {
      setNotfMessage(null);
    }, 5000);
  }

  function handleNameChange(e) {
    setNewName(e.target.value);
  }

  function handleNumberChange(e) {
    setNewNumber(e.target.value);
  }

  function handleFilter(e) {
    setFilter(persons.filter((person) => person.name.toLowerCase() === e.target.value.toLowerCase()));
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notfMessage} />
      <Filter handleFilter={handleFilter} filter={filter} />
      <PersonsForm
        handleNameSubmit={handleNameSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <Persons persons={persons} setPersons={setPersons} />
    </div>
  );
};

export default App;
