import { useState } from "react";

export default function App() {
  const [good, changeGood] = useState(0);
  const [bad, changeBad] = useState(0);
  const [neutral, changeNeutral] = useState(0);

  const scores = {
    good: good,
    bad: bad,
    neutral: neutral,
    all: good + bad + neutral,
  };

  function handleGoodClick() {
    changeGood(good + 1);
  }
  function handleBadClick() {
    changeBad(bad + 1);
  }
  function handleNeutralClick() {
    changeNeutral(neutral + 1);
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleBadClick} text="bad" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Statistic scores={scores} />
    </div>
  );
}

function Button({ handleClick, text }) {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  );
}

function Statistic({ scores }) {
  if (scores.all === 0) return <div>No feedback given</div>;
  return (
    <>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" score={scores.good} />
          <StatisticLine text="bad" score={scores.bad} />
          <StatisticLine text="neutral" score={scores.neutral} />
          <StatisticLine text="all" score={scores.all} />
          <StatisticLine text="average" score={scores.good - scores.bad / scores.all} />
          <StatisticLine text="positive" score={(scores.good / scores.all) * 100} />
        </tbody>
      </table>
    </>
  );
}

function StatisticLine({ text, score }) {
  return (
    <>
      <tr>
        <td>{text}:</td>
        <td>{score}</td>
      </tr>
    </>
  );
}
