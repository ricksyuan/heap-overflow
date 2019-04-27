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
    fetchQuestions: (sortType, limit, page) => dispatch(fetchQuestions(sortType, limit, page)),
  };
};

class AllQuestionsIndex extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      limit: 5,
    }
  }

  componentDidMount() {
    this.handleQuestionsRequest('VOTES', this.state.limit, this.props.match.params.pageNum);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.page.pageNum && prevProps.page.pageNum !== this.props.match.params.pageNum) {
      this.handleQuestionsRequest(this.state.sortType, this.state.limit, this.props.match.params.pageNum);
    }
  }

  handleQuestionsRequest(sortType, limit, page) {
    this.props.fetchQuestions(sortType, limit, page)
      .then(() => this.setState({
        loaded: true,
        sortType: sortType,
      }));
  }

  handleSort(sortType) {
      return (event) => {
        this.handleQuestionsRequest(sortType, this.state.limit, this.props.match.params.pageNum);
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
            <button className={`sort-btn votes-sort-btn ${this.state.sortType === 'VOTES' && 'sort-btn-selected'}`} onClick={this.handleSort('VOTES')}>Votes</button>
            <button className={`sort-btn newest-sort-btn ${this.state.sortType === 'NEWEST' && 'sort-btn-selected'}`} onClick={this.handleSort('NEWEST')}>Newest</button>
          </div>
        </div>

        <ul>
          {questionSummaries}
        </ul>
        <div className="all-questions-page-control">
          <PageControl page={this.props.page} urlBase="questions"/>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllQuestionsIndex);