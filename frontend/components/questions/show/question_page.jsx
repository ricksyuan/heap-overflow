import React from 'react';
import { connect } from 'react-redux';
import { fetchQuestion } from '../../../actions/question_actions';
import { Link } from 'react-router-dom';
import Question from './question';
import Answer from '../../answers/answer';

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
  };
};

class QuestionPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchQuestion(this.props.match.params.questionId);
  }

  render() {
    const { question, users } = this.props;
    if (!question) {
      return <div>Loading...</div>;
    }
    const answers = this.props.answers.map(answer => {
      const answerer = users[answer.answererId];
      return <Answer key={answer.id} answer={answer} answerer={answerer}/>;
    });
    return (
      <div className="question-page-container">
        <div className="question-page-header">
          <Link className="question-page-headline-link" to={`/questions/${question.id}`}>
            {question.title}
          </Link>
          <Link className="ask-question-link primary-btn" to={'/questions/ask'}>
            Ask question
          </Link>
        </div>
        <div className="question-page-content">
          <Question question={question}/>
          {answers}
        </div>
          
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);