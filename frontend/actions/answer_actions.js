import * as AnswerAPIUtil from '../utils/answer_api_util';

export const RECEIVE_ALL_ANSWERS = 'RECEIVE_ALL_ANSWERS';
export const RECEIVE_ANSWER = 'RECEIVE_ANSWER';

export const receiveAllAnswers = (payload) => {
  return {
    type: RECEIVE_ALL_ANSWERS,
    answers: payload.answers,
    users: payload.users,
    tags: payload.tags,
  };
};

export const receiveAnswer = (payload) => {
  return {
    type: RECEIVE_ANSWER,
    answer: payload.answer,
    user: payload.user,
    tags: payload.tags,
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

export const createAnswer = (answer) => (dispatch) => {
  return AnswerAPIUtil.createAnswer(answer);
};