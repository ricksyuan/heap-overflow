import merge from 'lodash/merge';
import {
  RECEIVE_ALL_QUESTIONS,
  RECEIVE_QUESTION,
} from '../actions/question_actions';
import { RECEIVE_SEARCH_RESULTS, RECEIVE_SEARCH_ERRORS } from '../actions/search_actions';
import { RECEIVE_TAGS, RECEIVE_TAG } from '../actions/tag_actions';

const _nullTags = {};

const tagReducer = (oldState = _nullTags, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ALL_QUESTIONS:
      return merge({}, oldState, action.tags);
    case RECEIVE_QUESTION:
      return merge({}, oldState, action.tags);
    case RECEIVE_TAGS:
      return merge({}, oldState, action.tags);
    case RECEIVE_TAG:
      return merge({}, oldState, { [action.tag.id]: action.tag });
    case RECEIVE_SEARCH_RESULTS:
      return action.tags;
    case RECEIVE_SEARCH_ERRORS:
      return _nullTags;
    default:
      return oldState;
  }
};

export default tagReducer;