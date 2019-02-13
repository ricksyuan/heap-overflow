import React from 'react';
import { connect } from 'react-redux';
import { deleteAnswer } from '../../actions/answer_actions';
import { upvoteAnswer, downvoteAnswer } from '../../actions/vote_actions';
import { openPopup } from '../../actions/popup_actions';
import CommentIndex from '../comments/comment_index';
import ReactQuill from 'react-quill';

const mapStateToProps = (state, ownProps) => {
  const comments = ownProps.answer.commentIds.map(commentId => (    
    state.entities.comments[commentId]
  ));
  const answerer = state.entities.users[ownProps.answer.answererId];
  const isLoggedIn = !!state.session.id;
  const isAuthor = (state.session.id === answerer.id);
  return {
    comments: comments,
    answerer: answerer,
    isLoggedIn: isLoggedIn,
    isAuthor: isAuthor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAnswer: (answerId) => dispatch(deleteAnswer(answerId)),
    upvoteAnswer: (answerId) => dispatch(upvoteAnswer(answerId)),
    downvoteAnswer: (answerId) => dispatch(downvoteAnswer(answerId)),
    openPopup: (popup) => dispatch(openPopup(popup)),
  };
};

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleDownvote = this.handleDownvote.bind(this);
  }

  handleUpvote() {
    if (this.props.isLoggedIn) {
      this.props.upvoteAnswer(this.props.answer.id);
    } else {
      this.props.openPopup({
        name: 'vote_error',
        clickCoordinate: { x: event.pageX, y: event.pageY },
      });
    }
  }

  handleDownvote() {
    if (this.props.isLoggedIn) {
      this.props.downvoteAnswer(this.props.answer.id);
    } else {
      this.props.openPopup({
        name: 'vote_error',
        clickCoordinate: { x: event.pageX, y: event.pageY },
      });
    }
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.deleteAnswer(this.props.answer.id);
  }

  render() {
    const { answer, answerer, comments } = this.props;

    return (
      <div className="answer-container">
        <div className="answer-voting">
          <button className={`up-arrow ${answer.currentUserVote === 'up_vote' ? 'current-user-vote' : ''}`} onClick={this.handleUpvote}>
            <svg className="svg-icon" aria-hidden="true" width="36" height="36" viewBox="0 0 36 36"><path d="M2 26h32L18 10z"></path></svg>
          </button>

          <div className="answer-score">{answer.score}</div>
          <button className={`down-arrow ${answer.currentUserVote === 'down_vote' ? 'current-user-vote' : ''}`} onClick={this.handleDownvote} >
            <svg className="svg-icon" aria-hidden="true" width="36" height="36" viewBox="0 0 36 36"><path d="M2 10h32L18 26z"></path></svg>
          </button>
        </div>
        <div className="answer-main">
          <ReactQuill
            readOnly
            modules={{ toolbar: null }}
            value={answer.body}
          />
          
          <div className="answer-footer">
            <div className="answer-buttons">
              {this.props.isAuthor && <button className="answer-delete-btn" onClick={this.handleDelete}>delete</button>}
            </div>
            <div className="answer-user">
              Answered by {answerer.displayName}
            </div>
          </div>
          <CommentIndex comments={comments} commentableType="Answer" commentableId={answer.id} />
        </div>
        
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Answer);