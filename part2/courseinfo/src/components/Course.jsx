import Content from "./Content";
import Header from "./Header";

const Course = ({ course, parts }) => {
  return (
    <>
      <Header course={course} />
      <Content parts={parts} />
    </>
  );
};

export default Course;
