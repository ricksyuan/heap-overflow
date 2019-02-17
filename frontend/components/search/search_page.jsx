import React from 'react';
import { connect } from 'react-redux';
import QuestionSummary from '../../components/questions/index/question_summary';
import { Link } from 'react-router-dom';
import SearchPageSearchBar from './search_page_search_bar';
import SearchSyntaxTable from './search_syntax';

const mapStateToProps = (state) => {
  const questions = Object.keys(state.entities.questions).map(id => state.entities.questions[id]);  
  return {
    questions: questions,
    query: state.ui.query,
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
      <div className="search-page">
        <div className="search-page-header">
          <h1 className="search-page-headline">
            Search
            {this.props.query.type === 'EXACT' &&
              ' Results'
            }

            {this.props.query.type === 'TAGS' &&
              ` for questions tagged ${this.props.query.parsedString}`
            }
          </h1>
          <Link className="ask-question-link primary-btn" to={'/questions/ask'}>
            Ask Question
           </Link>
        </div>
        <div>
          <SearchPageSearchBar key={this.props.query.parsedString} />
        </div>
        { questionSummaries.length === 0 &&
          <SearchSyntaxTable/>
        }
        <ul>
          {questionSummaries}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);