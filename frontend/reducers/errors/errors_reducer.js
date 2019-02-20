import { combineReducers } from 'redux';
import sessionErrorsReducer from './session_errors_reducer.js';
import questionErrorsReducer from './question_errors_reducer.js';
import answerErrorsReducer from './answer_errors_reducer.js';
import commentErrorsReducer from './comment_errors_reducer.js';
import voteErrorsReducer from './vote_errors_reducer.js';
import searchErrorsReducer from './search_errors_reducer.js';

// Helps keep track of any error messages.

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  questions: questionErrorsReducer,
  answers: answerErrorsReducer,
  comments: commentErrorsReducer,
  votes: voteErrorsReducer,
  search: searchErrorsReducer,
});

export default errorsReducer;
