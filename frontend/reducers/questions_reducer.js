import merge from 'lodash/merge';
import {
  RECEIVE_ALL_QUESTIONS,
  RECEIVE_QUESTION,
} from '../actions/question_actions';

const questionsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ALL_QUESTIONS:
      return merge({}, oldState, action.questions);
    case RECEIVE_QUESTION:
      const newQuestion = { [action.question.id]: action.question };
      return merge({}, oldState, newQuestion);
    default:
      return oldState;
  }
};

export default questionsReducer;