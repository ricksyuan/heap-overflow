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

class QuestionSummary extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <p>{this.props.question.title}</p>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionSummary);