import merge from 'lodash/merge';
import { RECEIVE_USER_PROFILE, RECEIVE_ALL_USERS } from '../actions/user_actions';
import { RECEIVE_ANSWER } from '../actions/answer_actions';
import {
  RECEIVE_ALL_QUESTIONS,
  RECEIVE_QUESTION,
} from '../actions/question_actions';
import { RECEIVE_SEARCH_RESULTS } from '../actions/search_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_ALL_USERS:
      return merge({}, state, action.users);
    case RECEIVE_USER_PROFILE:
      return merge({}, state, { [action.user.id]: action.user } );
    case RECEIVE_ALL_QUESTIONS:
      return merge({}, state, action.users);
    case RECEIVE_SEARCH_RESULTS:
      return merge({}, state, action.users);
    case RECEIVE_QUESTION:
      return merge({}, state, action.users);
    case RECEIVE_ANSWER:
      return merge({}, state, action.user);
    case RECEIVE_CURRENT_USER:
      return merge({}, state, { [action.currentUser.id]: action.currentUser });
    default:
      return state;
  }
};

export default usersReducer;