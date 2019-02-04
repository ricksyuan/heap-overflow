import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import questionsReducer from './questions_reducer';
import answersReducer from './answers_reducer';
import commentsReducer from './comments_reducer';
import tagsReducer from './tags_reducer';

const entitiesReducer = combineReducers({
  questions: questionsReducer,
  answers: answersReducer,
  comments: commentsReducer,
  users: usersReducer,
  tags: tagsReducer,
});

export default entitiesReducer;