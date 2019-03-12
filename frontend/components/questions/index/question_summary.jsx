import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import QuestionStat from './question_stat';
import { kFormatter } from '../../../utils/formatting_util';
import Tag from '../../tags/tag';
import moment from 'moment';

const mapStateToProps = (state, ownProps) => {
  const author = state.entities.users[ownProps.question.authorId];
  const tags = ownProps.question.tagIds.map(tagId => (
    state.entities.tags[tagId]
  ));
  return {
    author: author || {},
    tags: tags || {},
  };
};

class QuestionSummary extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const tags = this.props.tags.map(tag => {
      return <Tag key={tag.id} tag={tag}/>
    });
    return (
      <div className="question-list-item">
        <Link className="question-stats" to={`/questions/${this.props.question.id}`}>
          <QuestionStat className="votes" statName="votes" statCount={this.props.question.score}/>
          <QuestionStat className="answers" statName="answers" statCount={this.props.question.answerIds.length}/>
          <QuestionStat className="views" statName="views" statCount={kFormatter(this.props.question.views, 0)}/>          
        </Link>
        
        <div className="question-summary">
          <Link className="question-title-link" to={`/questions/${this.props.question.id}`}>
            {this.props.question.title}
          </Link>
          <div className="question-subtitle">
            <div className="question-tags">
              {tags}
            </div>
            <div className="question-author-info">
              <Link className="question-recency-link" to={`/questions/${this.props.question.id}`}>asked {moment(this.props.question.createdAt).fromNow()}</Link>
              {" "}
              <Link className="question-user-link" to={`/users/${this.props.author.id}/${this.props.author.displayName}`}>{this.props.author.displayName}</Link>
              {" "}
              <span title="reputation score" className="question-author-reputation">
                {this.props.author.reputation}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(QuestionSummary);