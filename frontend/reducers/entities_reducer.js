import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import questionsReducer from './questions_reducer';
import tagsReducer from './tags_reducer';

const entitiesReducer = combineReducers({
  questions: questionsReducer,
  users: usersReducer,
  tags: tagsReducer,
});

export default entitiesReducer;