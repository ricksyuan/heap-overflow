import React from 'react';
import { connect } from 'react-redux';
import QuestionSummary from '../../components/questions/index/question_summary';
import { Link } from 'react-router-dom';

const mapStateToProps = (state) => {
  const questions = Object.keys(state.entities.questions).map(id => state.entities.questions[id]);
  return {
    questions: questions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
}

class SearchPage extends React.Component {
  constructor(props) {
    super(props);    
  }

  render() {
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);