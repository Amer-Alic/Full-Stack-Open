import { useState } from "react";

const App = () => {
  const anecdotes = [
    {
      citation: "Adding manpower to a late software project makes it later!",
      votes: 0,
    },
    {
      citation:
        "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
      votes: 0,
    },
    {
      citation:
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
      votes: 0,
    },
    {
      citation: "Premature optimization is the root of all evil.",
      votes: 0,
    },
    {
      citation:
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
      votes: 0,
    },
    {
      citation:
        "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
      votes: 0,
    },
    {
      citation: "The only way to go fast is to go well.",
      votes: 0,
    },
  ];

  const [selected, setSelected] = useState(anecdotes);
  const [num, setNum] = useState(0);
  const [mostVotes, setMostVotes] = useState(0);

  function nextAnecdote() {
    const randomNum = Math.floor(Math.random() * selected.length);
    setNum(randomNum);
  }

  function addVote() {
    const selectedCopy = [...selected];
    selectedCopy[num].votes += 1;
    setSelected(selectedCopy);
    checkMostPopular();
  }

  function checkMostPopular() {
    let mostVoted = 0;
    for (let i = 0; i < selected.length; i++) {
      if (selected[i].votes > mostVoted) {
        mostVoted = selected[i].votes;
        setMostVotes(i);
      }
    }
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{selected[num].citation}</div>
      <div>has votes: {selected[num].votes}</div>
      <button onClick={nextAnecdote}>Next anecdote</button>
      <button onClick={addVote}>Vote</button>
      <h2>Anecdote with most votes</h2>
      <div>{selected[mostVotes].citation}</div>
      <div>has votes: {selected[mostVotes].votes}</div>
    </>
  );
};

export default App;
