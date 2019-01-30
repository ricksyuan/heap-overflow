import * as QuestionAPIUtil from '../utils/question_api_util';

export const RECEIVE_ALL_QUESTIONS = 'RECEIVE_ALL_QUESTIONS';
export const RECEIVE_QUESTION = 'RECEIVE_QUESTION';

export const receiveAllQuestions = (payload) => {
  return {
    type: RECEIVE_ALL_QUESTIONS,
    questions: payload.questions,
    users: payload.users,
    tags: payload.tags,
  };
};

export const receiveQuestion = (payload) => {
  return {
    type: RECEIVE_QUESTION,
    question: payload.question,
    tags: payload.tags,
  };
};


export const fetchAllQuestions = () => (dispatch) => {
  return QuestionAPIUtil.fetchAllQuestions().then(
    (payload) => {
      return dispatch(receiveAllQuestions(payload));
  });
};

export const fetchQuestion = (questionId) => (dispatch) => {
  return QuestionAPIUtil.fetchQuestion(questionId).then(
    (payload) => {
      return dispatch(receiveQuestion(payload));
    });
};


export const createQuestion = (question) => (dispatch) => {
  return QuestionAPIUtil.createQuestion(question);
};