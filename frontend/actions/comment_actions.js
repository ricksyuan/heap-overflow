import * as CommentAPIUtil from '../utils/comment_api_util';

export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const RECEIVE_COMMENT_ERRORS = 'RECEIVE_COMMENT_ERRORS';

const receiveComment = (payload) => {
  return {
    type: RECEIVE_COMMENT,
    comment: payload.comment,
  };
};

const removeComment = (comment) => {
  return {
    type: REMOVE_COMMENT,
    comment: comment,
  };
};

const receiveCommentErrors = (errors) => {
  return {
    type: RECEIVE_COMMENT_ERRORS,
    errors: errors,
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
  .then(
    ({comment}) => dispatch(removeComment(comment)),
    (errors) => dispatch(receiveCommentErrors(errors.responseJSON))
  );
};