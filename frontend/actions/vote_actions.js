import * as VoteAPIUtil from '../utils/vote_api_util';

// TODO: Delete or simplify second implementation
// File does two implementations for demonstration purposes:
// 1) Not making type dynamic (applied to voting on answers only)
//    - Uses corresponding controller (e.g. AnswerController) to handle votes
// 2) Making type (ideally) dynamic (applied to voting on questions only. Should be generalizable to comments)
//    - Uses VoteController to handle votes

export const RECEIVE_QUESTION_VOTE = 'RECEIVE_QUESTION_VOTE';
export const RECEIVE_ANSWER_VOTE = 'RECEIVE_ANSWER_VOTE';
export const RECEIVE_COMMENT_VOTE = 'RECEIVE_COMMENT_VOTE';

const receiveAnswerVote = ({answer}) => {
  return {
    type: RECEIVE_ANSWER_VOTE,
    answer: answer,
  };
};

export const upvoteAnswer = (answerId) => (dispatch) => {
  return VoteAPIUtil.upvoteAnswer(answerId)
    .then(answer => dispatch(receiveAnswerVote(answer)));
};

export const downvoteAnswer = (answerId) => (dispatch) => {
  return VoteAPIUtil.downvoteAnswer(answerId)
    .then(answer => dispatch(receiveAnswerVote(answer)));
};




const receiveVote = ({ payload, votableType }) => {
  let type;
  let field;
  let votable;
  switch (votableType) {
    case 'Question':
      type = RECEIVE_QUESTION_VOTE;
      field = 'question';
      votable = payload.question;
      break;
    case 'Answer':
      type = RECEIVE_ANSWER_VOTE;
      field = 'answer';
      votable = payload.answer;
      break;
    case 'Comment':
      type = RECEIVE_COMMENT_VOTE;
      field = 'comment';
      votable = payload.comment;
      break;
    default:
      type = "UNKNOWN_VOTABLE_TYPE";
  }
  return ({
    type: type,
    [field]: votable,
  });
};


export const vote = (voteType, votableType, votableId) => (dispatch) => {
  return VoteAPIUtil.vote(voteType, votableType, votableId)
    .then((payload)  => dispatch(receiveVote({payload, votableType})));
};