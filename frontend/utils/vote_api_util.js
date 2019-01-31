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