import merge from 'lodash/merge';
import {
  RECEIVE_ALL_QUESTIONS,
} from '../actions/question_actions';

const questionsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ALL_QUESTIONS:
      return merge({}, oldState, action.questions);
    default:
      return oldState;
  }
};

export default questionsReducer;