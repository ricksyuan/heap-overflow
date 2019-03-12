import React from 'react';
import { Link } from 'react-router-dom';

const QuestionPanel = ({questions}) => {
  const questionListItems = questions.map(question => {
    return (
      <li className="user-show-page-panel-list-item" key={question.id}>
        <div className="user-show-page-list-item-mini-count">{question.score}</div>
        <Link
          className="user-show-page-panel-list-item-link"
          to={`/questions/${question.id}`}
        >
          {question.title}
        </Link>
      </li>
    );
  });
  return (
    <div className="user-show-page-question-panel">
      <div className="user-show-page-panel-header">
        <span>
          Question{questions.length > 1 && "s"}:{" "}
        </span>
        <span className="user-show-page-panel-count">
          ({questions.length})
        </span>
      </div>
      <ul>
        {questionListItems}
      </ul>
    </div>
  );
};

export default QuestionPanel;