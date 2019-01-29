import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
  const asker = state.entities.users[ownProps.question.askerId];
  const tags = ownProps.question.tagIds.map(tagId => (
    state.entities.tags[tagId]
  ));
  return {
    asker: asker || {},
    tags: tags || {},
  };
};

class QuestionSummary extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const tags = this.props.tags.map(tag => {
      return <div className="tag" key={tag.id}>{tag.name}</div>
    });
    // const asker = this.props.users[this.props.question.askerId];
    return (
      
      <div className="question-summary">
        <Link className="question-title-link" to={`questions/${this.props.question.id}`}>
          {this.props.question.title}
        </Link>
        <div className="question-subtitle">
          <div className="tags">
            {tags}
          </div>
          <div className="started">
            asked by {this.props.asker.displayName}
          </div>
        </div>
      </div>
      
    );
  }
}

export default connect(mapStateToProps)(QuestionSummary);