import {
  RECEIVE_SESSION_ERRORS,
  CLEAR_SESSION_ERRORS,
  RECEIVE_CURRENT_USER,
} from '../actions/session_actions';

const _nullErrors = [];

const sessionErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      // Set errors to the action's errors.
      return action.errors;
    case RECEIVE_CURRENT_USER:
      // Clear the errors.
      return _nullErrors;
    case CLEAR_SESSION_ERRORS:
      return _nullErrors;
    default:
      return state;
  }
};

export default sessionErrorsReducer;