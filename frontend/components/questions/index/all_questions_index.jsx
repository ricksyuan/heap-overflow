import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchQuestions } from '../../../actions/question_actions';
import QuestionSummary from './question_summary';
import PageControl from '../../page_control';

const mapStateToProps = (state) => {
  return {
    questions: state.entities.questions,
    page: state.ui.page,
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
    this.requestQuestions('VOTES', 10, 1);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.page.pageNum && prevProps.page.pageNum !== this.props.match.params.pageNum) {
      this.props.fetchQuestions(this.props.match.params.pageNum).then(() => {
        this.setState({
          loaded: true,
        })
      });
    }
  }

  requestQuestions(sort, limit, page) {
    this.props.fetchQuestions(sort, limit, page)
      .then(() => this.setState({
        loaded: true,
      }));
  }

  handleSort(sortType) {
      return (event) => {
        this.requestQuestions(sortType, 10, 1);
      }
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
        <div className="questions-index-header">
          <h1 className="questions-index-headline">
            All Questions
          </h1>
          <Link className="ask-question-link primary-btn" to={'/questions/ask'}>
            Ask Question
          </Link>
        </div>
        <div>
          <div className="sort-btns">
            <button className="sort-btn newest-sort-btn sort-btn-selected" onClick={this.handleSort('NEWEST')}>Newest</button>
            <button className="sort-btn votes-sort-btn" onClick={this.handleSort('VOTES')}>Votes</button>
          </div>
        </div>

        <ul>
          {questionSummaries}
        </ul>
          <PageControl page={this.props.page} urlBase="questions"/>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllQuestionsIndex);