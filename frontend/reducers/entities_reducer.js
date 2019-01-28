import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import questionsReducer from './questions_reducer';


const entitiesReducer = combineReducers({
  questions: questionsReducer,
  users: usersReducer,
});

export default entitiesReducer;