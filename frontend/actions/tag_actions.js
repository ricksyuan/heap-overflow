export const RECEIVE_TAGS = 'RECEIVE_TAGS';
export const RECEIVE_TAG = 'RECEIVE_TAG';

// TODO: Finish

export const createTags = (tags) => (dispatch) => {
  return TagAPIUtil.createTags(tags)
    .then(newTags => dispatch(receiveTags(newTags)));
};

export const receiveTags = (payload) => {
  return {
    type: RECEIVE_TAGS,
    tags: payload.tags,
  };
};

export const receiveTag = (payload) => {
  return {
    type: RECEIVE_TAG,
    tag: payload.tag,
  };
};