import React from 'react';
import ReactQuill from 'react-quill';
import { connect } from 'react-redux';
import { postAnswer } from '../../actions/answer_actions';
import { toolbarOptions } from '../../utils/quill_toolbar_options'

const mapStateToProps = (state) => {
  return {
    errors: state.errors.answers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postAnswer: (questionId, answer) => dispatch(postAnswer(questionId, answer)),
  };
}; 

class AnswerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
    };
    this.handleQuillChange = this.handleQuillChange.bind(this);
    this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
    this.handleAnswerSubmission = this.handleAnswerSubmission.bind(this);
  }

  handleQuillChange(value) {
    this.setState({body: value});
  }

  handleTextAreaChange(event) {
    this.setState({ body: event.currentTarget.value });
  }

  handleAnswerSubmission(e) {
    e.preventDefault();
    this.props.postAnswer(this.props.questionId, { body: this.state.body })
      .then(this.setState({ body: '' }));
  }

  

  renderErrors() {
    return (
      <ul className="answer-error-ul">
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <>
        <form className="your-answer-form" onSubmit={this.handleAnswerSubmission}>
          <h2 className="your-answer-form-headline">Your Answer</h2>
          <ReactQuill
            modules={{ toolbar: toolbarOptions }}
            value={this.state.body}
            onChange={this.handleQuillChange}
          />
          {this.renderErrors()}
          <input type="submit" className="answer-submit-btn primary-btn" value="Post Your Answer" />
        </form>
      </>

    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(AnswerForm);