const Total = ({ parts }) => {
  const exercisesNumberArr = parts.map((item) => item.exercises);

  const total = exercisesNumberArr.reduce((acc, current) => acc + current, 0);

  return <h4>Total of {total} exercises</h4>;
};

export default Total;
