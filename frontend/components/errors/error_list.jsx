import React from 'react';

const ErrorList = (props) => {
  return (
    <ul className="error-ul">
      {props.errors.map((error, i) => (
        <li key={`error-${i}`}>
          {error}
        </li>
      ))}
    </ul>
  );  
};

export default ErrorList;