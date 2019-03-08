import React from 'react';

export const QuestionPanel = (props) => {
  const listItems = props.list.map(question => {
    return (<li key={question.id}>{question.title}</li>);
  });
  return (
    <ul>
      {listItems}
    </ul>
  );
};

export const AnswerPanel = (props) => {
  const listItems = props.list.map(question => {
    return (<li key={question.id}>{question.title}</li>);
  });
  return (
    <ul>
      {listItems}
    </ul>
  );
};

