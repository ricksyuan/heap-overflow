import {
  RECEIVE_ANSWER_ERRORS,
} from '../../actions/answer_actions';

const _nullErrors = [];

const commentErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ANSWER_ERRORS:
      return action.errors;
    default:
      // Clear answer errors unless answer error action received.
      return _nullErrors;
  }
};

export default commentErrorsReducer;