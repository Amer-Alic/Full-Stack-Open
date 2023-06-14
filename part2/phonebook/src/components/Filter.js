export default function Filter({ handleFilter, filter }) {
  return (
    <>
      <input onChange={(e) => handleFilter(e)}></input>
      <ul>
        {filter.map((element) => (
          <li key={element.name}>
            {element.name} {element.number}
          </li>
        ))}
      </ul>
    </>
  );
}
