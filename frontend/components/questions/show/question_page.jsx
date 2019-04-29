import React from 'react';
import { connect } from 'react-redux';
import { fetchQuestion } from '../../../actions/question_actions';
import { Link } from 'react-router-dom';
import Question from './question';
import Answer from '../../answers/answer';
import AnswerForm from '../../forms/answer_form';
import moment from 'moment';

const mapStateToProps = (state, ownProps) => {
  const question = state.entities.question;
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
      sortType: 'VOTES',
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

  handleSort(sortType) {
    return (event) => {
      console.log(`${sortType}  clicked`);
      this.setState({
        sortType: sortType,
      }, () => {console.log(`state set to ${sortType}`)})
    }
  }

  render() {
    if (!this.state.loaded) {
      return <></>;
    }

    if (!this.props.question) {
      return <></>;
    }
    const question = this.props.question;
    let answers;
    if (this.state.sortType === 'VOTES') {
      answers = this.props.answers.sort((answer1, answer2) => answer2.score - answer1.score);
    } else if (this.state.sortType === 'NEWEST') {
      answers = this.props.answers.sort((answer1, answer2) => moment.utc(answer2.createdAt).diff(moment.utc(answer1.createdAt)));
    } else if (this.state.sortType === 'OLDEST') {
      answers = this.props.answers.sort((answer1, answer2) => moment.utc(answer1.createdAt).diff(moment.utc(answer2.createdAt)));
    }
    answers = answers.map(answer => {
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
              <div className="answer-sort-btns">
                <button className={`answer-sort-btn ${this.state.sortType === 'VOTES' && 'answer-sort-btn-selected'}`} onClick={this.handleSort('VOTES')}>votes</button>
                <button className={`answer-sort-btn ${this.state.sortType === 'NEWEST' && 'answer-sort-btn-selected'}`} onClick={this.handleSort('NEWEST')}>newest</button>
                <button className={`answer-sort-btn ${this.state.sortType === 'OLDEST' && 'answer-sort-btn-selected'}`} onClick={this.handleSort('OLDEST')}>oldest</button>
              </div>
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