import * as UserAPIUtil from '../utils/user_api_util';

export const RECEIVE_ALL_USERS = 'RECEIVE_ALL_USERS';
export const RECEIVE_USER_PROFILE = 'RECEIVE_USER_PROFILE';
export const RECEIVE_USER_ERRORS = 'RECEIVE_USER_ERRORS';

const receiveUserProfile = (payload) => {
  return {
    type: RECEIVE_USER_PROFILE,
    user: payload.user,
    answers: payload.answers,
    questions: payload.questions,
  };
};

const receiveUserErrors = (errors) => {
  return {
    type: RECEIVE_USER_ERRORS,
    errors: errors,
  };
};

const receiveAllUsers = (payload) => {
  return {
    type: RECEIVE_ALL_USERS,
    users: payload.users,
    page: payload.page,
  };
};

export const fetchUserProfile = (userId) => (dispatch) => {
  return UserAPIUtil.fetchUserProfile(userId).then(
    (payload) => {
      return dispatch(receiveUserProfile(payload));
    },
    (errors) => dispatch(receiveUserErrors(errors))
  );
};

export const fetchAllUsers = (pageNum) => (dispatch) => {
  return UserAPIUtil.fetchAllUsers(pageNum).then(
    (users) => {
      return dispatch(receiveAllUsers(users));
    },
    (errors) => dispatch(receiveUserErrors(errors))
  );
};