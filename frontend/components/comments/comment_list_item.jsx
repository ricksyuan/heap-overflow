import React from 'react';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/comment_actions';
import { vote } from '../../actions/vote_actions';
import { openPopup } from '../../actions/popup_actions';
import ErrorList from '../errors/error_list';

const mapStateToProps = (state, ownProps) => {
  const commenter = state.entities.users[ownProps.comment.commenterId];
  const isLoggedIn = !!state.session.id;
  const isAuthor = (state.session.id === commenter.id);
  return {
    commenter: commenter,
    isLoggedIn: isLoggedIn,
    isAuthor: isAuthor,
    errors: state.errors.comments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    vote: (voteType, votableType, votableId) => dispatch(vote(voteType, votableType, votableId)),
    deleteComment: (commentId) => dispatch(deleteComment(commentId)),
    openPopup: (popup) => dispatch(openPopup(popup)),
  };
};

class CommentListItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteCommentClicked = this.handleDeleteCommentClicked.bind(this);
    this.handleUpvote = this.handleUpvote.bind(this);
  }

  handleDeleteCommentClicked(e) {
    if (this.props.isLoggedIn) {
      this.props.deleteComment(this.props.comment.id);
    } else {
      const clickCoordinate = { x: e.pageX, y: e.pageY };
      const popup = {
        name: 'comment_error',
        clickCoordinate: clickCoordinate,
      };
      this.props.openPopup(popup);
    }
  }

  handleUpvote(e) {
    if (this.props.isLoggedIn) {
      this.props.vote('up_vote', 'Comment', this.props.comment.id);
    } else {
      const clickCoordinate = { x: e.pageX, y: e.pageY };
      const popup = {
        name: 'vote_error',
        clickCoordinate: clickCoordinate,
      };
      this.props.openPopup(popup);
    }
    
  }

  render() {
    return (
      <li className="comment-list-item">
        <ErrorList errors={this.props.errors}/>
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
          {this.props.isAuthor && <button onClick={this.handleDeleteCommentClicked}>delete</button>}
        </div>
      </li>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentListItem);