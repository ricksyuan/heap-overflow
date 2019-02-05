import merge from 'lodash/merge';
import {
  RECEIVE_ALL_ANSWERS,
  RECEIVE_ANSWER,
  REMOVE_ANSWER,
} from '../actions/answer_actions';
import { RECEIVE_ANSWER_VOTE } from '../actions/vote_actions';
import { RECEIVE_COMMENT, REMOVE_COMMENT } from '../actions/comment_actions';
import {
  RECEIVE_QUESTION,
} from '../actions/question_actions';

const answersReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState;
  let answer;
  switch (action.type) {
    case RECEIVE_QUESTION:
      return merge({}, oldState, action.answers);
    case RECEIVE_ALL_ANSWERS:
      return merge({}, oldState, action.answers);
    case RECEIVE_ANSWER:
      return merge({}, oldState, action.answer);
    case REMOVE_ANSWER:
      newState = merge({}, oldState);
      delete newState[action.answerId];
      return newState;
    case RECEIVE_ANSWER_VOTE:
      return merge({}, oldState, action.answer);
    case RECEIVE_COMMENT:
      if (action.comment.commentableType !== 'Answer') {
        return oldState;
      } else {
        newState = merge({}, oldState);
        answer = newState[action.comment.commentableId];
        answer.commentIds.push(action.comment.id);
        return newState;
      }
    case REMOVE_COMMENT:
      if (action.comment.commentableType !== 'Answer') {
        return oldState;
      } else {
        newState = merge({}, oldState);
        answer = newState[action.comment.commentableId];
        const index = answer.commentIds.indexOf(action.comment.id);
        if (index > -1) {
          // Remove one element at index
          answer.commentIds.splice(index, 1);
        }
        return newState;
      }
    default:
      return oldState;
  }
};

export default answersReducer;