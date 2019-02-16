import React from 'react';
import { connect } from 'react-redux';
import { searchQuestions } from '../../actions/search_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => {
  return {
    parsedQuery: state.ui.parsedQuery,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchQuestions: (searchQuery) => dispatch(searchQuestions(searchQuery)),
  };
};

class SearchBar extends React.Component {
  
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
    this.state = {
      showSearchButton: false,
      searchQuery: props.parsedQuery,
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
    this.setState({showSearchButton: true});
  }

  handleBlur(e) {
    e.preventDefault();
    this.setState({showSearchButton: false});
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
      <div className="search-bar">
        <input className="search-bar-input" value={this.state.searchQuery} onKeyPress={this.handleKeyPress} onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange} placeholder="Search..." />
        { this.props.searchButton && this.state.showSearchButton &&
          <button className="search-button" type="submit" onMouseDown={this.handleMouseDown} onClick={this.handleSearchButtonClick}>
            <svg aria-hidden="true" className="svg-icon" width="18" height="18" viewBox="0 0 18 18"><path d="M12.86 11.32L18 16.5 16.5 18l-5.18-5.14v-.35a7 7 0 1 1 1.19-1.19h.35zM7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10z"></path></svg>
          </button>
        }
      </div>
    );
  }

}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBar));