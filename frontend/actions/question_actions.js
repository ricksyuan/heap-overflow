import * as QuestionAPIUtil from '../utils/question_api_util';

export const RECEIVE_ALL_QUESTIONS = 'RECEIVE_ALL_QUESITONS';

export const receiveAllQuestions = (payload) => {
  return {
    type: RECEIVE_ALL_QUESTIONS,
    questions: payload.questions,
  };
};

export const fetchAllQuestions = () => (dispatch) => {
  return QuestionAPIUtil.fetchAllQuestions().then(
    (payload) => {
      return dispatch(receiveAllQuestions(payload));
  });
};