import * as SessionAPIUtil from '../utils/session_api_util';

// REGULAR ACTION CREATORS

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';

const receiveCurrentUser = (currentUser) => ({ // IMPLICIT RETURN
  type: RECEIVE_CURRENT_USER,
  currentUser: currentUser,
});

const logoutCurrentUser = () => ({ // IMPLICIT RETURN
  type: LOGOUT_CURRENT_USER,
});

const receiveErrors = (errors) => ({ // IMPLICIT RETURN
  type: LOGOUT_CURRENT_USER,
  errors: errors,
});

// TODO: USE THESE THUNKS IN COMPONENTS

// TODO: LONG FORM EQUIVALENT FOR SIGNUP WITHOUT FAT ARROWS
// TODO: export const signup = (formUser) => {
// TODO: return (dispatch) => {
// TODO:   return SessionUtils.postUser(formUser).then(newUser => {
// TODO:     return dispatch(receiveCurrentUser(newUser));
// TODO:     });
// TODO:  };
// TODO: }

// TODO: dispatch in middle required for thunk actions!

// TODO: Can have errors when logging out!

// THUNK ACTION CREATORS

export const signup = formUser => dispatch => (
  SessionAPIUtil.postUser(formUser)
    .then(
      newUser => dispatch(receiveCurrentUser(newUser)),
      err => dispatch(receiveErrors(err.responseJSON))
    )
);

// TODO: Can have errors when logging out!
export const login = formUser => dispatch => (
  SessionAPIUtil.postSession(formUser)
    .then(
      returningUser => dispatch(receiveCurrentUser(returningUser)),
      err => dispatch(receiveErrors(err.responseJSON))
    )
);

export const logout = () => dispatch => (
  SessionAPIUtil.deleteSession()
    .then(
      () => dispatch(logoutCurrentUser())
    )
);

