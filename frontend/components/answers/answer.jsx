import React from 'react';
import { connect } from 'react-redux';
import { deleteAnswer } from '../../actions/answer_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAnswer: (answerId) => dispatch(deleteAnswer(answerId)),
  };
}

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  upVote() {

  }

  downVote() {
    
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.deleteAnswer(this.props.answer.id);
  }

  render() {
    const { answer, answerer } = this.props;
    return (
      <div className="answer-container">
        <div className="answer-voting">
          <button className="up-arrow" onClick={this.upVote}>
            <svg className="svg-icon" aria-hidden="true" width="36" height="36" viewBox="0 0 36 36"><path d="M2 26h32L18 10z"></path></svg>
          </button>

          <div className="answer-score">{this.props.answer.score}</div>
          <button className="down-arrow" onClick={this.props.downVote} >
            <svg className="svg-icon down-arrow" aria-hidden="true" width="36" height="36" viewBox="0 0 36 36"><path d="M2 10h32L18 26z"></path></svg>
          </button>
        </div>
        <div className="answer-main">
          <div className="answer-body">
            {answer.body}
          </div>
          <div className="answer-footer">
            <div className="answer-buttons">
              <button className="delete-answer-btn" onClick={this.handleDelete}>delete</button>
            </div>
            <div className="answer-user">
              Answered by {answerer.displayName}
            </div>
          </div>
          
        </div>
        
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Answer);