import axios from "axios";
const URL = "http://localhost:3001/persons";

function getAll() {
  const request = axios.get(URL);
  return request.then((response) => response.data);
}

function create(newPerson) {
  const request = axios.post(URL, newPerson);
  return request.then((response) => response.data);
}

function remove(id) {
  const request = axios.delete(`http://localhost:3001/persons/${id}`);
  return request.then((response) => response.data);
}

function update(newNumber, id) {
  const request = axios.put(`http://localhost:3001/persons/${id}`, newNumber);
  return request.then((response) => response.data);
}

const noteService = { getAll, create, remove, update };

export default noteService;
