import {
  RECEIVE_QUESTION_ERRORS,
} from '../../actions/question_actions';

const _nullErrors = [];

const questionErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_QUESTION_ERRORS:
      return action.errors;
    default:
      // Clear question errors unless question error action received.
      return _nullErrors;
  }
};

export default questionErrorsReducer;