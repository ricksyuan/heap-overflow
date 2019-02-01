import merge from 'lodash/merge';
import {
  RECEIVE_ALL_QUESTIONS,
  RECEIVE_SEARCH_RESULTS,
  RECEIVE_QUESTION,
} from '../actions/question_actions';
import { RECEIVE_TAGS, RECEIVE_TAG } from '../actions/tag_actions';

const tagReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ALL_QUESTIONS:
      return merge({}, oldState, action.tags);
    case RECEIVE_SEARCH_RESULTS:
      return merge({}, oldState, action.tags);
    case RECEIVE_QUESTION:
      return merge({}, oldState, action.tags);
    case RECEIVE_TAGS:
      return merge({}, oldState, action.tags);
    case RECEIVE_TAG:
      return merge({}, oldState, { [action.tag.id]: action.tag });
    default:
      return oldState;
  }
};

export default tagReducer;