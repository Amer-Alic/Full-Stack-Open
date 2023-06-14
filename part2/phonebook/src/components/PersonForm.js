export default function PersonsForm({ handleNameSubmit, handleNameChange, handleNumberChange }) {
  return (
    <form onSubmit={(e) => handleNameSubmit(e)}>
      <div>
        <h2>Add a new</h2>
        name: <input onChange={(e) => handleNameChange(e)} />
        number: <input onChange={(e) => handleNumberChange(e)}></input>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}
