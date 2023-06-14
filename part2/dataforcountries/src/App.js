import { useEffect, useState } from "react";
import axios from "axios";
import List from "./components/List";

function App() {
  const [result, setResult] = useState([]);
  const [countries, setCountries] = useState([]);

  function getAll() {
    const request = axios.get("https://studies.cs.helsinki.fi/restcountries/api/all");
    return request;
  }

  function handleInputChange(e) {
    setResult(
      countries.filter((countrie) => countrie.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    );
  }

  useEffect(() => {
    getAll().then((response) => setCountries(response.data));
  }, []);

  if (countries.length === 0) return;

  return (
    <>
      <form action="#">
        <label htmlFor="input">find countries</label>
        <input id="input" onChange={(e) => handleInputChange(e)}></input>
        <List result={result} setResult={setResult} />
      </form>
    </>
  );
}

export default App;
