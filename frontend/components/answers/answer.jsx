import React from 'react';
import { connect } from 'react-redux';
import { deleteAnswer } from '../../actions/answer_actions';
import { vote } from '../../actions/vote_actions';
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
    vote: (voteType, votableType, votableId) => dispatch(vote(voteType, votableType, votableId)),
    openPopup: (popup) => dispatch(openPopup(popup)),
  };
};

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }

  
  handleVote(voteType) {
    return (event) => {
      event.preventDefault();
      if (this.props.isLoggedIn) {
        this.props.vote(voteType, 'Answer', this.props.answer.id);
      } else {
        this.props.openPopup({
          name: 'vote_error',
          clickCoordinate: { x: event.pageX, y: event.pageY },
        });
      }
    };
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
          <button className={`up-arrow ${answer.currentUserVote === 'up_vote' ? 'current-user-vote' : ''}`} onClick={this.handleVote('up_vote')}>
            <svg className="svg-icon" aria-hidden="true" width="36" height="36" viewBox="0 0 36 36"><path d="M2 26h32L18 10z"></path></svg>
          </button>

          <div className="answer-score">{answer.score}</div>
          <button className={`down-arrow ${answer.currentUserVote === 'down_vote' ? 'current-user-vote' : ''}`} onClick={this.handleVote('down_vote')}>
            <svg className="svg-icon" aria-hidden="true" width="36" height="36" viewBox="0 0 36 36"><path d="M2 10h32L18 26z"></path></svg>
          </button>
        </div>
        <div className="answer-main">
          <ReactQuill
            readOnly
            modules={
              {
                syntax: false,    
                toolbar: null,
              }
            }
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