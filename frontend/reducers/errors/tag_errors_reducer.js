import {
  RECEIVE_TAG_ERRORS,
} from '../../actions/tag_actions';

const _nullErrors = [];

const tagErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_TAG_ERRORS:
      return action.errors;
    default:
      // Clear tag errors unless tag error action received.
      return _nullErrors;
  }
};

export default tagErrorsReducer;