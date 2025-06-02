import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

const Course = ({ course, parts }) => {
  return (
    <>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </>
  );
};

export default Course;
