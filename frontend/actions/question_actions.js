import * as QuestionAPIUtil from '../utils/question_api_util';

export const RECEIVE_ALL_QUESTIONS = 'RECEIVE_ALL_QUESTIONS';
export const RECEIVE_QUESTION = 'RECEIVE_QUESTION';
export const REMOVE_QUESTION = 'REMOVE_QUESTION';
export const RECEIVE_QUESTION_ERRORS = 'RECEIVE_QUESTION_ERRORS';

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
    answers: payload.answers,
    comments: payload.comments,
    users: payload.users,
    tags: payload.tags,
  };
};

export const removeQuestion = (questionId) => {
  // TODO: clean up additional state like tags
  return {
    type: REMOVE_QUESTION,
    questionId: questionId,
  };
};

const receiveQuestionErrors = (errors) => {
  return {
    type: RECEIVE_QUESTION_ERRORS,
    errors: errors,
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
  return QuestionAPIUtil.createQuestion(question)
    .then(
      (question) => dispatch(receiveQuestion(question)),
      (errors) => dispatch(receiveQuestionErrors(errors.responseJSON))
    )
};

export const deleteQuestion = (questionId) => (dispatch) => {
  return QuestionAPIUtil.deleteQuestion(questionId)
    .then((questionId) => {
      return dispatch(removeQuestion(questionId));
    });
};