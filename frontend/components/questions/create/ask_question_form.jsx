import React from 'react';
import { connect } from 'react-redux';
import { createQuestion } from '../../../actions/question_actions';
import { createTags } from '../../../actions/tag_actions';

const mapStateToProps = (state) => {
  return {
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createQuestion: (question) => dispatch(createQuestion(question)),
    createTags: (tags) => dispatch(createTags(tags)),
  };
};

class AskQuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {title: '', body: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDiscard = this.handleDiscard.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(field) {
    return (event) => {
      console.log(event.currentTarget.value);  
      this.setState({[field]: event.currentTarget.value});
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createQuestion(this.state)
      .then((newQuestionId)=>this.props.history.push(`/questions/${newQuestionId}`));
  }

  handleDiscard(e) {
    e.preventDefault();

  }

  render () {
    return (
      <div className="ask-container">
        <form className="ask-form">
          <div className="ask-headline">Ask a question</div>
          <div className="ask-title">
            <label className="ask-title-label">Title</label>
            <input
              className="ask-title-input"
              value={this.state.title}
              onChange={this.handleChange('title')}
              name="title"
              type="text"
              maxLength="300"
              tabIndex="100"
              placeholder="What's your programming question? Be specific."
              autoComplete="off"
            />
          </div>
          <div className="ask-body-editor">
            <label className="ask-body-label">Body</label>
            <textarea
              className="ask-body-textarea"
              value={this.state.body}
              onChange={this.handleChange('body')}
              name="body"
              tabIndex="101"
              autoComplete="off"
            ></textarea>
          </div>
          <div className="ask-tags">
            <label className="ask-tags-label">Tags</label>
            <input
              className="ask-tags-input"
              type="text"
              value={this.state.tags}
              onChange={this.handleChange('tags')}
              autoComplete="off"
              tabIndex="102"
              placeholder="e.g. (arrays wpf xcode)"
            />
          </div>
          <div className="ask-submit">
            <button className="ask-submit-btn primary-btn" onClick={this.handleSubmit}>Post Your Question</button>
            <button className="ask-discard-btn" onClick={this.handleDiscard}>Discard</button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AskQuestionForm);