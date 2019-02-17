import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { vote } from '../../../actions/vote_actions';
import { deleteQuestion } from '../../../actions/question_actions';
import { openPopup } from '../../../actions/popup_actions';
import Tag from '../tag';
import CommentIndex from '../../comments/comment_index';
import ReactQuill from 'react-quill';

const mapStateToProps = (state, ownProps) => {
  const comments = ownProps.question.commentIds.map(commentId => {
    return state.entities.comments[commentId];
  });
  const tags = ownProps.question.tagIds.map(tagId => (
    state.entities.tags[tagId]
  ));
  const asker = state.entities.users[ownProps.question.askerId];
  const isLoggedIn = !!state.session.id;
  const isAuthor = (state.session.id === asker.id);
  return {
    tags: tags,
    comments: comments,
    asker: asker,
    isLoggedIn: isLoggedIn,
    isAuthor: isAuthor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteQuestion: (questionId) => dispatch(deleteQuestion(questionId)),
    vote: (voteType, votableType, votableId) => dispatch(vote(voteType, votableType, votableId)),
    openPopup: (popup) => dispatch(openPopup(popup)),
  };
};

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }

  handleVote(voteType) {
    return (event) => {
      event.preventDefault();
      if (this.props.isLoggedIn) {
        this.props.vote(voteType, 'Question', this.props.question.id);
      } else {
        this.props.openPopup({
          name: 'vote_error',
          clickCoordinate: {x: event.pageX, y: event.pageY},
        });
      }
    };
  }


  handleDelete(e) {
    e.preventDefault();
    this.props.deleteQuestion(this.props.question.id)
      .then(({questionId}) => {
        return this.props.history.push('/');
      });
  }

  render() {

    const tags = this.props.tags.map(tag => {
      return <Tag key={tag.id} tag={tag}/>;
    });
    

    return (
      <div className="question-container">
        <div className="question-voting">
          <button className={`up-arrow ${this.props.question.currentUserVote === 'up_vote' ? 'current-user-vote' : ''}`} onClick={this.handleVote("up_vote")}>
            <svg className="svg-icon" aria-hidden="true" width="36" height="36" viewBox="0 0 36 36"><path d="M2 26h32L18 10z"></path></svg>
          </button>
        
          <div className="question-score">{this.props.question.score}</div>
          <button className={`down-arrow ${this.props.question.currentUserVote === 'down_vote' ? 'current-user-vote' : ''}`} onClick={this.handleVote("down_vote")} >
            <svg className="svg-icon" aria-hidden="true" width="36" height="36" viewBox="0 0 36 36"><path d="M2 10h32L18 26z"></path></svg>
          </button>
        </div>
        <div className="question-main">
          <div className="question-body">
            <ReactQuill
              readOnly
              modules={
                {
                  syntax: false,
                  toolbar: null
                }
              }
              value={this.props.question.body}
            />
          </div>
          <div className="question-tags">
            {tags}
          </div>
          <div className="question-footer">
            <div className="question-buttons">
              {this.props.isAuthor && <button className="question-delete-btn" onClick={this.handleDelete}>delete</button>}
            </div>
            <div className="question-user">
              Asked by {this.props.asker.displayName}
            </div>            
          </div>
          <CommentIndex comments={this.props.comments} commentableType="Question" commentableId={this.props.question.id} />
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Question));