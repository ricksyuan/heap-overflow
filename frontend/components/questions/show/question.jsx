import React from 'react';
import { connect } from 'react-redux';
import { vote } from '../../../actions/vote_actions';
const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    vote: (voteType, votableType, votableId) => dispatch(vote(voteType, votableType, votableId)),
  };
};

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
  }

  upvote() {
    this.props.vote("up_vote", "Question", this.props.question.id);
  }

  downvote() {
    this.props.vote("down_vote", "Question", this.props.question.id);
  }

  render() {    
    return (
      <div className="question-container">
        <div className="question-voting">
          <button className="up-arrow" onClick={this.upvote}>
            <svg className="svg-icon" aria-hidden="true" width="36" height="36" viewBox="0 0 36 36"><path d="M2 26h32L18 10z"></path></svg>
          </button>
        
          <div className="question-score">{this.props.question.score}</div>
          <button className="down-arrow" onClick={this.downvote} >
            <svg className="svg-icon down-arrow" aria-hidden="true" width="36" height="36" viewBox="0 0 36 36"><path d="M2 10h32L18 26z"></path></svg>
          </button>
        </div>
        <div className="question-main">
          <div className="question-body">
            {this.props.question.body}
          </div>
          <div className="question-footer">
            <div className="question-buttons">
            </div>
            <div className="question-user">
              Asked by {this.props.asker.displayName}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Question);