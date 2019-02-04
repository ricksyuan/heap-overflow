import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { vote } from '../../../actions/vote_actions';
import { deleteQuestion } from '../../../actions/question_actions';
import Tag from '../tag';
import CommentIndex from '../../comments/comment_index';

const mapStateToProps = (state, ownProps) => {
  const comments = ownProps.question.commentIds.map(commentId => (
    state.entities.comments[commentId]
  ));
  const tags = ownProps.question.tagIds.map(tagId => (
    state.entities.tags[tagId]
  ));
  return {
    tags: tags,
    comments: comments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteQuestion: (questionId) => dispatch(deleteQuestion(questionId)),
    vote: (voteType, votableType, votableId) => dispatch(vote(voteType, votableType, votableId)),
  };
};

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
  }

  upvote() {
    this.props.vote("up_vote", "Question", this.props.question.id);
  }

  downvote() {
    this.props.vote('down_vote', 'Question', this.props.question.id);
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
          <button className={`up-arrow ${this.props.question.currentUserVote === 'up_vote' ? 'current-user-vote' : ''}`} onClick={this.upvote}>
            <svg className="svg-icon" aria-hidden="true" width="36" height="36" viewBox="0 0 36 36"><path d="M2 26h32L18 10z"></path></svg>
          </button>
        
          <div className="question-score">{this.props.question.score}</div>
          <button className={`down-arrow ${this.props.question.currentUserVote === 'down_vote' ? 'current-user-vote' : ''}`} onClick={this.downvote} >
            <svg className="svg-icon" aria-hidden="true" width="36" height="36" viewBox="0 0 36 36"><path d="M2 10h32L18 26z"></path></svg>
          </button>
        </div>
        <div className="question-main">
          <div className="question-body">
            {this.props.question.body}
          </div>
          <div className="question-tags">
            {tags}
          </div>
          <div className="question-footer">
            <div className="question-buttons">
              <button className="question-delete-btn" onClick={this.handleDelete}>delete</button>
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