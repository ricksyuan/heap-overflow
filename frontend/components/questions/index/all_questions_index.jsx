import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchQuestions } from '../../../actions/question_actions';
import QuestionSummary from './question_summary';

const mapStateToProps = (state) => {
  return {
    questions: state.entities.questions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuestions: (sort, limit, page) => dispatch(fetchQuestions(sort, limit, page)),
  };
};

class AllQuestionsIndex extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    requestQuestions('NEWEST', 10, 1);
  }

  requestQuestions(sort, limit, page) {
    this.props.fetchQuestions(sort, limit, page)
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
            All Questions
          </h1>
          <Link className="ask-question-link primary-btn" to={'/questions/ask'}>
            Ask Question
          </Link>
        </div>
        <div>
          <button>Newest</button>
          <button>Votes</button>
        </div>

        <ul>
          {questionSummaries}
        </ul>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllQuestionsIndex);