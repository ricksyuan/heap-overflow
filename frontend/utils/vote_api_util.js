export const vote = (voteType, votableType, votableId) => {
  return $.ajax({
    method: 'POST',
    url: 'api/votes/',
    data: {
      vote_type: voteType,
      votable_type: votableType,
      votable_id: votableId,
    }
  });
};

export const upvoteAnswer = (answerId) => {
  return $.ajax({
    method: 'POST',
    url: `api/answers/${answerId}/upvote`,
  });
};

export const downvoteAnswer = (answerId) => {
  return $.ajax({
    method: 'POST',
    url: `api/answers/${answerId}/downvote`,
  });
};