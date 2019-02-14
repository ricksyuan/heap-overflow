import React from 'react';
import { connect } from 'react-redux';
import { searchQuestions } from '../../actions/search_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => {

  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchQuestions: (query) => dispatch(searchQuestions(query)),
  };
};

class SearchBar extends React.Component {
  
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.state = {query: ''}
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.searchQuestions(this.state.query)
        .then((action) => {
          this.setState({query: action.query});
        });
      this.props.history.push(`/search/`);
    }
  }

  handleChange(e) {
    this.setState({
      query: e.currentTarget.value,
    });
  }

  handleFocus(e) {
    // Show search button.
    const searchButton = document.querySelector(".search-button");
    searchButton.style.visibility = "visible";    
  }

  handleBlur(e) {
    const searchButton = document.querySelector(".search-button");
    searchButton.style.visibility = "hidden";
  }

  handleSearchButtonClick(e) {
  }


  render() {
    return (
      <div className="search-bar">
        <input className="search-bar-input" value={this.state.query} onKeyPress={this.handleKeyPress} onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange} placeholder="Search..." />
        <button className="search-button" type="submit" onClick={this.handleSearchButtonClick}>
          <svg aria-hidden="true" className="svg-icon" width="18" height="18" viewBox="0 0 18 18"><path d="M12.86 11.32L18 16.5 16.5 18l-5.18-5.14v-.35a7 7 0 1 1 1.19-1.19h.35zM7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10z"></path></svg>
        </button>
      </div>
    );
  }

}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBar));