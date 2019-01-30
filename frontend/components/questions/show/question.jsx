import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

class Question extends React.Component {
  constructor(props) {
    super(props);

  }

  upVote() {
    
  }

  downVote() {

  }

  render() {    
    return (
      <div className="question-container">
        <div className="question-voting">
          <button className="up-arrow" onClick={this.upVote}>
            <svg className="svg-icon" aria-hidden="true" width="36" height="36" viewBox="0 0 36 36"><path d="M2 26h32L18 10z"></path></svg>
          </button>
        
          <div className="question-score">{this.props.question.score}</div>
          <button className="down-arrow" onClick={this.props.downVote} >
            <svg className="svg-icon down-arrow" aria-hidden="true" width="36" height="36" viewBox="0 0 36 36"><path d="M2 10h32L18 26z"></path></svg>
          </button>
        </div>

        <div className="question-body">
          {this.props.question.body}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Question);