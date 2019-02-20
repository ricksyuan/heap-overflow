import * as TagAPIUtil from '../utils/tag_api_util';

export const RECEIVE_TAGS = 'RECEIVE_TAGS';
export const RECEIVE_TAG = 'RECEIVE_TAG';
export const RECEIVE_TAG_ERRORS = 'RECEIVE_TAG_ERRORS';


const receiveTags = (payload) => {
  return {
    type: RECEIVE_TAGS,
    tags: payload.tags,
  };
};

const receiveTagErrors = (errors) => {
  return {
    type: RECEIVE_TAG_ERRORS,
    errors: errors,
  };
};

export const createTags = (tags) => (dispatch) => {
  return TagAPIUtil.createTags(tags)
    .then(newTags => dispatch(receiveTags(newTags)));
};

export const fetchTags = () => (dispatch) => {
  return TagAPIUtil.fetchAllTags().then(
    (tags) => dispatch(receiveTags(tags)),
    (errors) => dispatch(receiveTagErrors(errors.responseJSON))
  );
};