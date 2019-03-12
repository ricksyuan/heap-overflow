import React from 'react';
import { Link } from 'react-router-dom';

// Answer Panel shows answer's score followed by title of question associated with user's answer
const AnswerPanel = ({ questions }) => {
  const questionListItems = questions.map(question => {
    return (
      <li className="user-show-page-panel-list-item" key={question.id}>
        <div className="user-show-page-list-item-mini-count">{question.answerScore}</div>
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
    <div className="user-show-page-answer-panel">
      <div className="user-show-page-panel-header">
        <span>
          Answer{questions.length > 1 && "s"}:{" "}
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

export default AnswerPanel;