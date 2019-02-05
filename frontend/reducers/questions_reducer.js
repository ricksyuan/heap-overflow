import merge from 'lodash/merge';
import {
  RECEIVE_ALL_QUESTIONS,
  RECEIVE_QUESTION,
  REMOVE_QUESTION,
  RECEIVE_SEARCH_RESULTS,
  
} from '../actions/question_actions';
import { RECEIVE_ANSWER } from '../actions/answer_actions';
import { RECEIVE_COMMENT, REMOVE_COMMENT } from '../actions/comment_actions';
import { RECEIVE_QUESTION_VOTE } from '../actions/vote_actions';

const questionsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState;
  let question;
  switch (action.type) {
    case RECEIVE_ALL_QUESTIONS:
      return merge({}, oldState, action.questions);
    case RECEIVE_ANSWER:
      newState = merge({}, oldState);
      const answer = Object.values(action.answer)[0];
      if (newState[answer.questionId].answerIds) {
        newState[answer.questionId].answerIds.push(answer.id);
      } else {
        newState[answer.questionId].answerIds = [answer.id];
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
    case RECEIVE_QUESTION:
      return merge({}, oldState, { [action.question.id]: action.question });
    case REMOVE_QUESTION:
      newState = merge({}, oldState);
      delete newState[action.questionId];
      return newState;
    case RECEIVE_QUESTION_VOTE:
      return merge({}, oldState, action.question);
    default:
      return oldState;
  }
};

export default questionsReducer;