import merge from 'lodash/merge';
import {
  RECEIVE_QUESTIONS,
} from '../actions/question_actions';
import {
  RECEIVE_SEARCH_RESULTS,
  RECEIVE_SEARCH_ERRORS,
} from '../actions/search_actions';
import { RECEIVE_ANSWER, REMOVE_ANSWER } from '../actions/answer_actions';
import { RECEIVE_COMMENT, REMOVE_COMMENT } from '../actions/comment_actions';
import { RECEIVE_QUESTION_VOTE } from '../actions/vote_actions';
import { LOGOUT_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_USER_PROFILE } from '../actions/user_actions';

const _nullQuestions = {};

const questionsReducer = (oldState = _nullQuestions, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return action.questions;
    case RECEIVE_SEARCH_RESULTS:
      return merge({}, action.questions);
    case RECEIVE_SEARCH_ERRORS:
      return [];
    case RECEIVE_USER_PROFILE:
      return action.questions;
    case LOGOUT_CURRENT_USER:
      return _nullQuestions;
    default:
      return oldState;
  }
};

export default questionsReducer;