import {
  RECEIVE_SESSION_ERRORS,
  RECEIVE_CURRENT_USER,
} from '../actions/session_actions';

const sessionErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      // Set errors to the action's errors.
      return action.errors;
    case RECEIVE_CURRENT_USER:
      // Clear the errors.
      return [];
    default:
      return state;
  }
};

export default sessionErrorsReducer;