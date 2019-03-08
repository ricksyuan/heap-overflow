

export const RECEIVE_USER_PROFILE = 'RECEIVE_USER_PROFILE';
export const RECEIVE_USER_ERRORS = 'RECEIVE_USER_ERRORS';

export const fetchUserProfile = (userId) => (dispatch) => {
  return $.ajax({
    method: 'GET',
    url: `/api/users/${userId}`,
  }).then(
    (payload) => {
      return dispatch({
        type: RECEIVE_USER_PROFILE,
        user: payload.user,
        answers: payload.answers,
        questions: payload.questions,
      });
    },
    (errors) => dispatch({
      type: RECEIVE_USER_ERRORS,
      errors: errors,
    })
  );
};