import {
  RECEIVE_COMMENT_ERRORS,
} from '../../actions/comment_actions';

const _nullErrors = [];

const commentErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_COMMENT_ERRORS:
      return action.errors;
    default:
      return _nullErrors;
  }
};

export default commentErrorsReducer;