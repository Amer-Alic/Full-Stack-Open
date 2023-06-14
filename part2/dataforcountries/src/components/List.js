export default function List({ result, setResult }) {
  if (result.length === 1) {
    const languageArray = Object.entries(result[0].languages);

    return (
      <>
        <h1>{result[0].name.common}</h1>
        <p>capital: {result[0].capital[0]}</p>
        <p>area: {result[0].area}</p>
        <h2>languages</h2>
        <ul>
          {languageArray.map(([key, language], index) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={result[0].flags.png}></img>
      </>
    );
  }

  if (result.length > 1 && result.length <= 10) {
    return (
      <>
        <h2>Countries:</h2>
        <ul>
          {result.map((countrie) => {
            return (
              <li key={countrie.name.common}>
                {countrie.name.common}
                <button
                  onClick={() => {
                    setResult([countrie]);
                  }}
                >
                  Show
                </button>
              </li>
            );
          })}
        </ul>
      </>
    );
  }

  if (result.length > 10) {
    return <h2>Be more specific</h2>;
  }

  if (result.length === 0) {
    return <h2>There is no countrie under this name</h2>;
  }
}
