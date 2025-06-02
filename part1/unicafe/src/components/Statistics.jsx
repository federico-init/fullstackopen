import React from "react";
import StatisticLine from "./StatisticLine";

const Statistics = ({ good, neutral, bad, totalFeedbacks }) => {
  const getAverageScore = () => {
    // the feedback values are: good 1, neutral 0, bad -1
    // so we can get the total of good feedback and subtract bad feedbacks, ignoring the neutral ones
    const averageScore = (good - bad) / totalFeedbacks;
    return averageScore || 0;
  };

  const getPositivePercentage = () => {
    const positivePercentage = (good * 100) / totalFeedbacks;
    return positivePercentage || 0;
  };

  if (totalFeedbacks === 0) {
    return <p>No feedback yet</p>;
  }

  return (
    <>
      <StatisticLine value={good} text="🙂" />
      <StatisticLine value={neutral} text="😐" />
      <StatisticLine value={bad} text="☹️" />
      <StatisticLine value={totalFeedbacks} text="Total" />
      <StatisticLine value={getAverageScore()} text="Average score" />
      <StatisticLine value={getPositivePercentage()} text="Positive" />
    </>
  );
};

export default Statistics;
