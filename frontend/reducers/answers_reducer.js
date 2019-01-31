import merge from 'lodash/merge';
import {
  RECEIVE_ALL_ANSWERS,
  RECEIVE_ANSWER,
  REMOVE_ANSWER,
} from '../actions/answer_actions';
import {
  RECEIVE_QUESTION,
} from '../actions/question_actions';

const answersReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_QUESTION:
      return merge({}, oldState, action.answers);
    case RECEIVE_ALL_ANSWERS:
      return merge({}, oldState, action.answers);
    case RECEIVE_ANSWER:
      return merge({}, oldState, action.answer);
    case REMOVE_ANSWER:
      const newState = merge({}, oldState);
      delete newState[action.answerId];
      return newState;
    default:
      return oldState;
  }
};

export default answersReducer;