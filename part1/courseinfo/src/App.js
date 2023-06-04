import { useState } from "react";

export default function App() {
  const course = {
    name: "Half Stack application development",
    parts: [
      { name: "Fundementals of React", exercises: 10 },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      <Render />
    </div>
  );
}

function Header(props) {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  );
}

function Part(props) {
  return (
    <div>
      <p>
        {props.name} {props.exercises}
      </p>
    </div>
  );
}

function Content(props) {
  return (
    <div>
      <Part name={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part name={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part name={props.parts[2].name} exercises={props.parts[2].exercises} />
    </div>
  );
}

function Total(props) {
  return (
    <div>
      <p>
        Total number of exercises: {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
      </p>
    </div>
  );
}

function Render() {
  const [index, setIndex] = useState(0);

  setTimeout(() => {
    console.log(index);
    setIndex(index + 1);
  }, 1000);
}
