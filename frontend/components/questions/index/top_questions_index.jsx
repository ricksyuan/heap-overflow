import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllQuestions } from '../../../actions/question_actions';
import QuestionSummary from './question_summary';

const mapStateToProps = (state) => {
  const questions = Object.values(state.entities.questions);
  return {
    questions: questions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllQuestions: () => dispatch(fetchAllQuestions()),
  };
};

class TopQuestionsIndex extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    this.props.fetchAllQuestions()
      .then(() => this.setState({
        loaded: true,
      }));
  }

  render() {
    if (!this.state.loaded) {
      return <></>;
    }
    const questionSummaries = this.props.questions.map(question => (
      <QuestionSummary key={question.id} question={question} />
    ));
    return (
      <>
        <div className="top-questions-header">
          <h1 className="top-questions-headline">
            Top Questions
          </h1>
          <Link className="ask-question-link primary-btn" to={'/questions/ask'}>
            Ask Question
          </Link>
        </div>
        
        
        <ul>
          {questionSummaries}
        </ul>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopQuestionsIndex);