import React from 'react';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/comment_actions';
import { vote } from '../../actions/vote_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    commenter: state.entities.users[ownProps.comment.commenterId],
    errors: state.errors.comments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    vote: (voteType, votableType, votableId) => dispatch(vote(voteType, votableType, votableId)),
    deleteComment: (commentId) => dispatch(deleteComment(commentId)),
  };
};

class CommentListItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteCommentClicked = this.handleDeleteCommentClicked.bind(this);
    this.handleUpvote = this.handleUpvote.bind(this);
  }

  handleDeleteCommentClicked(e) {
    this.props.deleteComment(this.props.comment.id);
  }

  handleUpvote(e) {
    this.props.vote("up_vote", "Comment", this.props.comment.id);
  }

  renderErrors() {
    return (
      <ul className="comment-error-ul">
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <li className="comment-list-item">
        {this.renderErrors()}
        <div className="comment-left-aside">
          <div className="comment-review-actions">
            <div className="comment-score">
              {this.props.comment.score}
            </div>
            <div className='comment-vote-btn'>
              <button className={`up-arrow ${this.props.comment.currentUserVote === 'up_vote' ? 'current-user-vote' : ''}`} onClick={this.handleUpvote}>
                <svg aria-hidden="true" className="svg-icon" width="18" height="18" viewBox="0 0 18 18"><path d="M1 13h16L9 5z"></path></svg>
              </button>
            </div>
          </div>
        </div>
        <div className="comment-text">
          {this.props.comment.body} - {this.props.commenter.displayName}
        </div>
        
        <div className="comment-delete">          
          <button onClick={this.handleDeleteCommentClicked}>delete</button>
        </div>
      </li>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentListItem);