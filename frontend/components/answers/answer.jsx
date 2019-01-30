import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
  };
}

const mapDispatchToProps = (dispatch) => {
  return {

  };
}

class Answer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { answer, answerer } = this.props;
    return (
      <div className="answer-container">
      ANSWER:
        <div className="answer-body">{answer.body}</div>
        <div className="answer-user">{answerer.displayName}</div>
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Answer);