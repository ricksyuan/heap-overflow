import * as SessionAPIUtil from '../utils/session_api_util';

// Action Creators

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const CLEAR_SESSION_ERRORS = 'CLEAR_SESSION_ERRORS';

const receiveCurrentUser = (currentUser) => ({
  type: RECEIVE_CURRENT_USER,
  currentUser: currentUser,
});

const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER,
});

const receiveSessionErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors: errors,
});

export const clearErrors = () => ({
  type: CLEAR_SESSION_ERRORS,
});

// Thunk Action Creators

export const signup = formUser => dispatch => (
  SessionAPIUtil.postUser(formUser)
    .then(
      newUser => dispatch(receiveCurrentUser(newUser)),
      err => {
        return dispatch(receiveSessionErrors(err.responseJSON));
      }
    )
);

export const login = formUser => dispatch => (
  SessionAPIUtil.postSession(formUser)
    .then(
      returningUser => dispatch(receiveCurrentUser(returningUser)),
      err => dispatch(receiveSessionErrors(err.responseJSON))
    )
);

export const loginDemo = () => dispatch => {
  return SessionAPIUtil.postDemoUser()
    .then(
      returningUser => dispatch(receiveCurrentUser(returningUser)),
      err => dispatch(receiveSessionErrors(err.responseJSON))
    );
};


export const logout = () => dispatch => (
  SessionAPIUtil.deleteSession()
    .then(
      () => dispatch(logoutCurrentUser())
    )
);

