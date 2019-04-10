import React from 'react';
import { connect } from 'react-redux';
import CommentListItem from './comment_list_item';
import { postComment } from '../../actions/comment_actions';
import { openPopup } from '../../actions/popup_actions';
import ErrorList from '../../components/errors/error_list';

const mapStateToProps = (state) => {
  const isLoggedIn = !!state.session.id;
  return {
    isLoggedIn: isLoggedIn,
    errors: state.errors.comments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postComment: (comment) => dispatch(postComment(comment)),
    openPopup: (popup) => dispatch(openPopup(popup)),
  };
};

class CommentIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showCommentField: false, commentBody: '' };
    this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
    this.handleAddCommentClick = this.handleAddCommentClick.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }

  handleTextAreaChange(e) {
    this.setState({ commentBody: e.currentTarget.value });
  }

  handleAddCommentClick(e) {
    if (this.props.isLoggedIn) {
      this.setState({ showCommentField: true });
    } else {
      this.props.openPopup({
        name: 'COMMENT_ERROR',
        clickCoordinate: {x: e.pageX, y: e.pageY},
      });
    }
  }

  handleCommentSubmit(e) {
    e.preventDefault();
    this.props.postComment(
      {
        body: this.state.commentBody,
        commentable_type: this.props.commentableType,
        commentable_id: this.props.commentableId,
      }).then(() => this.setState({ commentBody: '', showCommentField: false }));
  }

  render() {
    const comments = this.props.comments.map(comment => {
      return <CommentListItem key={comment.id} comment={comment} />;
    });
    return (
      <div className="comment-index">
        <ErrorList errors={this.props.errors}/>
        <ul>
          {comments.length > 0 && comments}
        </ul>
        { 
          this.state.showCommentField === false ? <button className="show-comment-form-btn link" onClick={this.handleAddCommentClick} value="Add a comment">Add a comment</button> : 

          <form className="comment-body-form" onSubmit={this.handleCommentSubmit}>
            <textarea className="comment-body-textarea" onChange={this.handleTextAreaChange} value={this.state.commentBody} placeholder='Use comments to ask for more information or suggest improvements. Avoid comments like "+1" or "thanks".'></textarea>
            <div className="comment-body-right-column">
              <input className="comment-body-submit primary-btn" type="submit" value="Add comment"/>
            </div>
          </form>
        }        
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentIndex);