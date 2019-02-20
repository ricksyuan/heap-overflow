import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { searchQuestions } from '../../actions/search_actions';

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchQuestions: (searchQuery) => dispatch(searchQuestions(searchQuery)),
  };
};

class Tag extends React.Component {
  constructor(props) {
    super(props);
    this.handleTagClick = this.handleTagClick.bind(this)
  }

  handleTagClick() {
    this.props.history.push('/search');
    this.props.searchQuestions(this.props.tag.name);
  }

  render() {
    return (
      <>
        <button className="question-tag" onClick={this.handleTagClick}>
          {this.props.tag.name}
        </button>
      </>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tag));
