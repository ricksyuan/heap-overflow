import React from 'react';
import { connect } from 'react-redux';
import { fetchAllQuestions } from '../../actions/question_actions';
import QuestionSummary from './question_summary';
const mapStateToProps = (state) => {
  const questions = Object.keys(state.entities.questions).map(id => state.entities.questions[id]);
  return {
    questions: questions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllQuestions: () => dispatch(fetchAllQuestions()),
  };
};

class TopQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {questions: {}};
  }
  componentDidMount() {
    console.log("Component mounted!");
    this.props.fetchAllQuestions();
  }

  render() {
    const questionSummaries = this.props.questions.map(question => (
      <QuestionSummary key={question.id} question={question} />
    ));
    return (
      <>
        <h1 className="top-questions-headline">Top Questions</h1>
        <ul>
          {questionSummaries}
        </ul>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopQuestions);