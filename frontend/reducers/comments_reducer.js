import merge from 'lodash/merge';
import {
  RECEIVE_COMMENT,
  REMOVE_COMMENT,
} from '../actions/comment_actions';
import { RECEIVE_COMMENT_VOTE } from '../actions/vote_actions';
import {
  RECEIVE_QUESTION,
} from '../actions/question_actions';
import { LOGOUT_CURRENT_USER } from '../actions/session_actions';

const _nullComments = {};

const commentsReducer = (oldState = _nullComments, action) => {
  Object.freeze(oldState);
  let newState;
  switch (action.type) {
    case RECEIVE_QUESTION:
      return merge({}, oldState, action.comments);
    // case RECEIVE_ALL_COMMENTS:
    //   return merge({}, oldState, action.comment);
    case RECEIVE_COMMENT:
      return merge({}, oldState, {[action.comment.id]: action.comment});
    // case RECEIVE_COMMENT_VOTE:
    //   return merge({}, oldState, action.comment);
    case REMOVE_COMMENT:
      newState = merge({}, oldState);
      delete newState[action.commentId];
      return newState;
    case RECEIVE_COMMENT_VOTE:
      return merge({}, oldState, action.comment);
    case LOGOUT_CURRENT_USER:
      return _nullComments;
    default:
      return oldState;
  }
};

export default commentsReducer;