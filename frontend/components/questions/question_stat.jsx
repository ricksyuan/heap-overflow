import React from 'react';

const QuestionStat = (props) => (
  <div className={`question-stat ${props.className}`}>
    <div className="stat-count">
      {props.statCount}
    </div>
    <div className="stat-name">
      {props.statName}
    </div>
  </div>
);

export default QuestionStat;