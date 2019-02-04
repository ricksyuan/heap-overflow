export const createComment = (formComment) => {
  return $.ajax({
    method: 'POST',
    url: '/api/comments',
    data: { comment: formComment },
  });
};

export const deleteComment = (commentId) => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/comments/${commentId}`,
  });
};