export default function Course({ courses }) {
  return (
    <>
      {courses.map((course) => {
        return (
          <div key={course.id}>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
          </div>
        );
      })}
    </>
  );
}

function Header({ name }) {
  return <h1>{name}</h1>;
}

function Content({ parts }) {
  return (
    <ul>
      {parts.map((part) => {
        return <Part key={part.id} name={part.name} exercises={part.exercises} />;
      })}
    </ul>
  );
}

function Part({ name, exercises }) {
  return (
    <>
      <li>
        {name}: {exercises}
      </li>
    </>
  );
}

function Total({ parts }) {
  const total = parts.reduce(function (p, c) {
    return p + c.exercises;
  }, 0);

  return (
    <>
      <p>Total of {total} exercises</p>
    </>
  );
}
