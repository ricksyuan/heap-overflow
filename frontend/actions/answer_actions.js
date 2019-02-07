import * as AnswerAPIUtil from '../utils/answer_api_util';

export const RECEIVE_ALL_ANSWERS = 'RECEIVE_ALL_ANSWERS';
export const RECEIVE_ANSWER = 'RECEIVE_ANSWER';
export const REMOVE_ANSWER = 'REMOVE_ANSWER';

export const receiveAllAnswers = (payload) => {
  return {
    type: RECEIVE_ALL_ANSWERS,
    answers: payload.answers,
    users: payload.users,
  };
};

export const receiveAnswer = (payload) => {
  return {
    type: RECEIVE_ANSWER,
    answer: payload.answer,
    user: payload.user,
  };
};

export const removeAnswer = (answerId) => {
  return {
    type: REMOVE_ANSWER,
    answerId: answerId,
  };
};

export const fetchAllAnswers = () => (dispatch) => {
  return AnswerAPIUtil.fetchAllAnswers().then(
    (payload) => {
      return dispatch(receiveAllAnswers(payload));
    });
};

export const fetchAnswer = (answerId) => (dispatch) => {
  return AnswerAPIUtil.fetchAnswer(answerId).then(
    (payload) => {
      return dispatch(receiveAnswer(payload));
    });
};

export const postAnswer = (questionId, answer) => (dispatch) => {
  return AnswerAPIUtil.postAnswer(questionId, answer)
    .then(payload => dispatch(receiveAnswer(payload)));
};

export const deleteAnswer = (answerId) => (dispatch) => {
  return AnswerAPIUtil.deleteAnswer(answerId)
    .then(answerId => {
      return dispatch(removeAnswer(answerId));
    });
};