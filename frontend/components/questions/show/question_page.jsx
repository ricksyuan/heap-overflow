import React from 'react';
import { connect } from 'react-redux';
import { fetchQuestion } from '../../../actions/question_actions';
import { Link } from 'react-router-dom';
import Question from './question';
import Answer from '../../answers/answer';
import AnswerForm from '../../forms/answer_form';

const mapStateToProps = (state, ownProps) => {
  const question = state.entities.questions[ownProps.match.params.questionId]; //TODO: add empty values
  let answers = [];
  if (question && question.answerIds) {
    question.answerIds.forEach(answerId => { 
      const answer = state.entities.answers[answerId];
      if (answer) answers.push(answer);
    });
  }
  return {
    question: question,
    answers: answers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuestion: (questionId) => dispatch(fetchQuestion(questionId)),
  };
};

class QuestionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    this.props.fetchQuestion(this.props.match.params.questionId)
    .then((payload) => {
      return this.setState({
        loaded: true,
      });
    });
  }

  render() {
    if (!this.state.loaded) {
      return <></>;
    }

    if (!this.props.question) {
      return <></>;
    }
    const question = this.props.question;
    const answers = this.props.answers.map(answer => {
      return <Answer key={answer.id} answer={answer}/>;
    });
    return (
      <div className="question-page">
        <div className="question-page-header">
          <Link className="question-page-headline-link" to={`/questions/${question.id}`}>
            {question.title}
          </Link>
          <Link className="ask-question-link primary-btn" to={'/questions/ask'}>
            Ask Question
          </Link>
        </div>
        <div className="question-page-content">
          <Question question={question}/>
          <div className="answers-container">
            <header className="answers-header">
              {answers.length} Answer{answers.length === 1  ? '' : 's'}
            </header>
            <ul>
              {answers}
            </ul>
          </div>
        </div>
        <AnswerForm className="answer-form-textarea-body" questionId={question.id}/>                  
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);