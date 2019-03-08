import merge from 'lodash/merge';
import {
  RECEIVE_ALL_QUESTIONS,
  RECEIVE_QUESTION,
  REMOVE_QUESTION,  
} from '../actions/question_actions';
import {
  RECEIVE_SEARCH_RESULTS,
  RECEIVE_SEARCH_ERRORS,
} from '../actions/search_actions';
import { RECEIVE_ANSWER, REMOVE_ANSWER } from '../actions/answer_actions';
import { RECEIVE_COMMENT, REMOVE_COMMENT } from '../actions/comment_actions';
import { RECEIVE_QUESTION_VOTE } from '../actions/vote_actions';
import { LOGOUT_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_USER_PROFILE } from '../actions/user_actions';

const _nullQuestions = {};

const questionsReducer = (oldState = _nullQuestions, action) => {
  Object.freeze(oldState);
  let newState;
  let question;
  let answer;
  switch (action.type) {
    case RECEIVE_ALL_QUESTIONS:
      return merge({}, oldState, action.questions);
    case RECEIVE_ANSWER:
      newState = merge({}, oldState);
      answer = Object.values(action.answer)[0];
      if (newState[answer.questionId].answerIds) {
        newState[answer.questionId].answerIds.push(answer.id);
      } else {
        newState[answer.questionId].answerIds = [answer.id];
      }
      return newState;
    case REMOVE_ANSWER:
      newState = merge({}, oldState);      
      question = newState[action.answer.questionId];
      const index = question.answerIds.indexOf(action.answer.id);
      if (index > -1) {
        question.answerIds.splice(index, 1);
      }
      return newState;  
    case RECEIVE_COMMENT:
      if (action.comment.commentableType !== 'Question') {
        return oldState;
      } else {
        newState = merge({}, oldState);
        question = newState[action.comment.commentableId];
        question.commentIds.push(action.comment.id);
        return newState;
      }
    case REMOVE_COMMENT:
      if (action.comment.commentableType !== 'Question') {
        return oldState;
      } else {
        newState = merge({}, oldState);
        question = newState[action.comment.commentableId];
        const index = question.commentIds.indexOf(action.comment.id);
        if (index > -1) {
          // Remove one element at index
          question.commentIds.splice(index, 1);
        }
        return newState;
      }
    case RECEIVE_SEARCH_RESULTS:
      return merge({}, action.questions);
    case RECEIVE_SEARCH_ERRORS:
      return {};
    case RECEIVE_QUESTION:
      return merge({}, oldState, { [action.question.id]: action.question });
    case REMOVE_QUESTION:
      newState = merge({}, oldState);
      delete newState[action.questionId];
      return newState;
    case RECEIVE_QUESTION_VOTE:
      return merge({}, oldState, action.question);
    case RECEIVE_USER_PROFILE:
      return merge({}, oldState, action.questions);
    case LOGOUT_CURRENT_USER:
      return _nullQuestions;
    default:
      return oldState;
  }
};

export default questionsReducer;