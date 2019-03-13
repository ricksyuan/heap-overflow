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
    if (question.authorId === userId) {
      userQuestions.push(question);
    };
  });
  // Filter answers asked by the user. Then get question titles for those answers.
  const userAnswers = Object.values(state.entities.answers).filter(answer => {
    return answer.authorId === userId
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
    let goldBadgeCount = 0
    let silverBadgeCount = 0;
    let bronzeBadgeCount = 0;
    this.props.user.badges.forEach(badge => {
      switch (badge.badgeType) {
        case 1:
          goldBadgeCount += 1;
          break;
        case 2:
          silverBadgeCount += 1;
          break;
        case 3:
          bronzeBadgeCount += 1;
          break;
      };
    });
    return (
      <>
        <div className="user-show-page">
          <div className="avatar-container">
            <AvatarCard
              reputation={this.props.user.reputation}
              displayName={this.props.user.displayName}
              hash={this.props.user.emailHash}
              goldBadgeCount={goldBadgeCount}
              silverBadgeCount={silverBadgeCount}
              bronzeBadgeCount={bronzeBadgeCount}
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