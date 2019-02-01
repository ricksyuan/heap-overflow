import merge from 'lodash/merge';
import {
  RECEIVE_ALL_QUESTIONS,
  RECEIVE_QUESTION,
  REMOVE_QUESTION,
  RECEIVE_SEARCH_RESULTS,
} from '../actions/question_actions';
import { RECEIVE_QUESTION_VOTE } from '../actions/vote_actions';

const questionsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ALL_QUESTIONS:
      return merge({}, oldState, action.questions);
    case RECEIVE_SEARCH_RESULTS:
      return merge({}, action.questions);
    case RECEIVE_QUESTION:
      return merge({}, oldState, { [action.question.id]: action.question });
    case REMOVE_QUESTION:
      const newState = merge({}, oldState);
      delete newState[action.questionId];
      return newState;
    case RECEIVE_QUESTION_VOTE:
      return merge({}, oldState, action.question);
    default:
      return oldState;
  }
};

export default questionsReducer;