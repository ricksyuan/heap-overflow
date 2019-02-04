import * as CommentAPIUtil from '../utils/comment_api_util';

export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';

const receiveComment = (payload) => {
  return {
    type: RECEIVE_COMMENT,
    comment: payload.comment,
  };
};

const removeComment = (comment) => {
  return {
    type: REMOVE_COMMENT,
    commentId: comment.id,
    commentableType: comment.commentableType,
    commentableId: comment.commentableId,
  };
};

export const postComment = (formComment) => (dispatch) => {
  return CommentAPIUtil.createComment(formComment)
    .then(newComment => {
      return dispatch(receiveComment(newComment));
    });
};

export const deleteComment = (commentId) => (dispatch) => {
  return CommentAPIUtil.deleteComment(commentId)

    .then(({comment}) => {
      return dispatch(removeComment(comment));
    });
};