import { combineReducers } from 'redux';
import sessionErrorsReducer from './session_errors_reducer.js';

// Helps keep track of any error messages.

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,  
});

export default errorsReducer;
