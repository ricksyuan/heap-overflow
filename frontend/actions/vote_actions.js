import * as VoteAPIUtil from '../utils/vote_api_util';

export const RECEIVE_QUESTION_VOTE = 'RECEIVE_QUESTION_VOTE';
export const RECEIVE_ANSWER_VOTE = 'RECEIVE_ANSWER_VOTE';

const receiveVote = ({ score, votableType }) => {
  return ({
    type: `RECEIVE_${votableType.toUpperCase()}_VOTE`,
    score: score
  });
};

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


// export const upvote(votableType, votableId, voteType) => (dispatch) => {
//   return VoteAPIUtil.postVote(votableType, votableId, voteType)
//     .then((score, votable_type) => dispatch(receiveVote({score, votable_type})));
// };