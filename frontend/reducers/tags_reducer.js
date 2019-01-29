import merge from 'lodash/merge';
import { RECEIVE_ALL_QUESTIONS } from '../actions/question_actions';
import { RECEIVE_TAGS, RECEIVE_TAG } from '../actions/tag_actions';

const tagReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_QUESTIONS:
      return merge({}, state, action.tags);
    case RECEIVE_TAGS:
      return merge({}, state, action.tags);
    case RECEIVE_TAG:
      return merge({}, state, { [action.tag.id]: action.tag });
    default:
      return state;
  }
};

export default tagReducer;