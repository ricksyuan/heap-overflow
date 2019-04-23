import merge from 'lodash/merge';
import {
  RECEIVE_QUESTION,
  REMOVE_QUESTION,
} from '../actions/question_actions';
import { RECEIVE_ANSWER, REMOVE_ANSWER } from '../actions/answer_actions';
import { RECEIVE_COMMENT, REMOVE_COMMENT } from '../actions/comment_actions';
import { RECEIVE_QUESTION_VOTE } from '../actions/vote_actions';
import { LOGOUT_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_USER_PROFILE } from '../actions/user_actions';

const _nullQuestion = {};

const questionReducer = (oldState = _nullQuestion, action) => {
  Object.freeze(oldState);
  let question;
  let answer;
  switch (action.type) {
    case RECEIVE_QUESTION:
      return action.question;
    case RECEIVE_ANSWER:
      // add answer id to question
      question = oldState;
      answer = Object.values(action.answer)[0];
      if (question.answerIds) {
        question.answerIds.push(answer.id);
      } else {
        question.answerIds = [answer.id];
      }
      return question;
    case REMOVE_ANSWER:
      question = oldState;
      const index = question.answerIds.indexOf(action.answer.id);
      if (index > -1) {
        question.answerIds.splice(index, 1);
      }
      return question;
    case RECEIVE_COMMENT:
      if (action.comment.commentableType !== 'Question') {
        return oldState;
      } else {
        question = oldState;
        question.commentIds.push(action.comment.id);
        return question;
      }
    case REMOVE_COMMENT:
      if (action.comment.commentableType !== 'Question') {
        return oldState;
      } else {
        question = oldState;
        const index = question.commentIds.indexOf(action.comment.id);
        if (index > -1) {
          // Remove one element at index
          question.commentIds.splice(index, 1);
        }
        return question;
      }
    case REMOVE_QUESTION:
      return _nullQuestion;
    case RECEIVE_QUESTION_VOTE:
      return merge({}, oldState, action.question);
    case RECEIVE_USER_PROFILE:
      return merge({}, oldState, action.questions);
    case LOGOUT_CURRENT_USER:
      return _nullQuestion;
    default:
      return oldState;
  }
};

export default questionReducer;