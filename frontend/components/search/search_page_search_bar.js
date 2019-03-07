import React from 'react';
import { connect } from 'react-redux';
import { searchQuestions } from '../../actions/search_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => {
  return {
    parsedQueryString: state.ui.query.parsedString,
    queryType: state.ui.query.type,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchQuestions: (searchQuery) => dispatch(searchQuestions(searchQuery)),
  };
};

class SearchPageSearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
    this.state = {
      showSearchButton: false,
      searchQuery: props.parsedQueryString,
    }
  }

  performSearch() {
    this.props.history.push(`/search/`);
    this.props.searchQuestions(this.state.searchQuery);
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.performSearch();
    }
  }

  handleChange(e) {
    this.setState({
      searchQuery: e.currentTarget.value,
    });
  }

  handleFocus(e) {
    // Show search button.
    e.preventDefault();
    this.setState({ showSearchButton: true });
  }

  handleBlur(e) {
    e.preventDefault();
    this.setState({ showSearchButton: false });
  }

  handleMouseDown(e) {
    // Prevents handleBlur from being called to allow search to be performed.
    e.preventDefault();
  }

  handleSearchButtonClick(e) {
    e.preventDefault();
    this.performSearch();
    document.activeElement.blur();
  }

  render() {
    return (
      <div className="search-page-search-bar">
        <input className="search-page-search-input" value={this.state.searchQuery} onKeyPress={this.handleKeyPress} onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange} placeholder="" />
        <button className="search-page-search-button primary-btn" type="submit" onMouseDown={this.handleMouseDown} onClick={this.handleSearchButtonClick}>
          Search
        </button>
      </div>
    );
  }

}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPageSearchBar));