import { combineReducers } from 'redux';
import sessionErrorsReducer from './session_errors_reducer.js';
import answerErrorsReducer from './answer_errors_reducer.js';
import commentErrorsReducer from './comment_errors_reducer.js';

// Helps keep track of any error messages.

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  answers: answerErrorsReducer,
  comments: commentErrorsReducer,
});

export default errorsReducer;
