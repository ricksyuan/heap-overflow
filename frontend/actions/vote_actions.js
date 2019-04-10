import * as VoteAPIUtil from '../utils/vote_api_util';

export const RECEIVE_QUESTION_VOTE = 'RECEIVE_QUESTION_VOTE';
export const RECEIVE_ANSWER_VOTE = 'RECEIVE_ANSWER_VOTE';
export const RECEIVE_COMMENT_VOTE = 'RECEIVE_COMMENT_VOTE';
export const RECEIVE_VOTE_ERRORS = 'RECEIVE_VOTE_ERRORS';

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

export const receiveVoteErrors = (errors) => {
  return {
    type: RECEIVE_VOTE_ERRORS,
    errors: errors
  };
}


export const vote = (voteType, votableType, votableId) => (dispatch) => {
  return VoteAPIUtil.vote(voteType, votableType, votableId)
    .then(
      (payload)  => dispatch(receiveVote({payload, votableType})),
      (errors) => dispatch(receiveVoteErrors(errors.responseJSON))
    );
};