import { useState } from "react";
import Button from "./components/Button";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  //button event handlers
  const handleClickGood = () => {
    setGood((current) => current + 1);
  };
  const handleClickNeutral = () => {
    setNeutral((current) => current + 1);
  };
  const handleClickBad = () => {
    setBad((current) => current + 1);
  };

  return (
    <>
      <h1>Leave your feedback!</h1>
      <Button onClick={handleClickGood} text="🙂" />
      <Button onClick={handleClickNeutral} text="😐" />
      <Button onClick={handleClickBad} text="☹️" />
      <h1>Statistics</h1>
      <div>🙂 : {good}</div>
      <div>😐 : {neutral}</div>
      <div>☹️ : {bad}</div>
    </>
  );
};

export default App;
