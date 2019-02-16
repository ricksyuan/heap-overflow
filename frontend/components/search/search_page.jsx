import React from 'react';
import { connect } from 'react-redux';
import QuestionSummary from '../../components/questions/index/question_summary';
import { Link } from 'react-router-dom';
import SearchBar from '../../components/search/search_bar';

const mapStateToProps = (state) => {
  const questions = Object.keys(state.entities.questions).map(id => state.entities.questions[id]);  
  return {
    questions: questions,
    parsedQuery: state.ui.parsedQuery || "",
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
        <div className="search-header">
          <h1 className="search-headline">
            Search
          </h1>
          <div>
            <SearchBar key={this.props.parsedQuery}/>
          </div>
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