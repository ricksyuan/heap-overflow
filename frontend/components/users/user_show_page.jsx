import React from 'react';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../../actions/user_actions';
import QuestionPanel from './panels/question_panel';
import AnswerPanel from './panels/answer_panel';
import AvatarCard from './avatar_card';

const mapStateToProps = (state, ownProps) => {
  const userId = Number(ownProps.match.params.userId);
  const user = state.entities.users[userId] || {};
  const userQuestions = [];
  Object.values(state.entities.questions).forEach(question => {
    if (question.askerId === userId) {
      userQuestions.push(question);
    };
  });
  // Filter answers asked by the user. Then get question titles for those answers.
  const userAnswers = Object.values(state.entities.answers).filter(answer => {
    return answer.answererId === userId
  });
  const userAnswerQuestions = userAnswers.map(answer => {
    return state.entities.questions[answer.questionId];
  });
  return {
    user: user,
    userQuestions: userQuestions,
    userAnswerQuestions: userAnswerQuestions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserProfile: (userId) => dispatch(fetchUserProfile(userId)),
  };
};

class UserShowPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    }
  }

  componentDidMount() {
    // fetch user
    this.props.fetchUserProfile(this.props.match.params.userId)
      .then(() => this.setState({loaded: true}));
  }

  render() {
    if (!this.state.loaded) return <></>;
    return (
      <>
        <div className="user-show-page">
          <div className="avatar-container">
            <AvatarCard
              reputation={this.props.user.reputation}
              displayName={this.props.user.displayName}
              hash={this.props.user.emailHash}
            />
          </div>
          <div className="user-show-page-panels">
            <QuestionPanel questions={this.props.userQuestions}/>
            <AnswerPanel questions={this.props.userAnswerQuestions} />
          </div>
        </div>
      </>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserShowPage);