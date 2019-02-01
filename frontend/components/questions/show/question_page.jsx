import React from 'react';
import { connect } from 'react-redux';
import { fetchQuestion } from '../../../actions/question_actions';
import { postAnswer } from '../../../actions/answer_actions';
import { Link } from 'react-router-dom';
import Question from './question';
import Answer from '../../answers/answer';
import AnswerForm from '../../forms/answer_form';


const mapStateToProps = (state, ownProps) => {
  return {
    question: state.entities.questions[ownProps.match.params.questionId],
    answers: Object.keys(state.entities.answers).map(id => state.entities.answers[id]),
    users: state.entities.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuestion: (questionId) => dispatch(fetchQuestion(questionId)),
    postAnswer: (questionId, answer) => dispatch(postAnswer(questionId, answer)),
  };
};

class QuestionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleAnswerSubmission = this.handleAnswerSubmission.bind(this);
  }

  componentDidMount() {
    this.props.fetchQuestion(this.props.match.params.questionId);
  }

  handleChange(event) {
    this.setState({body: event.currentTarget.value});
  }

  handleAnswerSubmission(e) {
    e.preventDefault();
    this.props.postAnswer(this.props.question.id, {body: this.state.body})
      .then(this.setState({body: ''}));
  }

  render() {
    const { question, users } = this.props;
    if (!question) {
      return <></>;
    }
    const asker = users[this.props.question.askerId];
    const answers = this.props.answers.map(answer => {
      const answerer = users[answer.answererId];
      return <Answer key={answer.id} answer={answer} answerer={answerer}/>;
    });
    return (
      <div className="question-page">
        <div className="question-page-header">
          <Link className="question-page-headline-link" to={`/questions/${question.id}`}>
            {question.title}
          </Link>
          <Link className="ask-question-link primary-btn" to={'/questions/ask'}>
            Ask question
          </Link>
        </div>
        <div className="question-page-content">
          <Question question={question} asker={asker}/>
          <div className="answers-container">
            <header className="answers-header">
              {answers.length} Answer{answers.length === 1  ? '' : 's'}
            </header>
            <ul>
              {answers}
            </ul>
          </div>
        </div>
        
        <form className="your-answer-form" onSubmit={this.handleAnswerSubmission}>
          <h2 className="your-answer-form-headline">Your Answer</h2>
          <textarea className="answer-form-textarea-body" name="body" onChange={this.handleChange} value={this.state.body}></textarea>
          {/* <AnswerForm className="answer-form-textarea-body"/> */}
          <input type="submit" className="answer-submit-btn primary-btn" value="Post Your Answer" />
          
        </form>
          
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);