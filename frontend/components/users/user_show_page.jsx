import React from 'react';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../../actions/user_actions';
import { QuestionPanel, AnswerPanel } from './panels';
import Gravatar from '../gravatar';

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
          <div>
            <Gravatar size={32} email={this.props.user.email} />
          </div>
          <div>
            Display Name: {this.props.user.displayName}
          </div>
          <div>
            Reputation: {this.props.user.reputation}
          </div>
          <div>
            Questions: {this.props.userQuestions.length}
            {/* <QuestionPanel list={this.props.userQuestions}/> */}
          </div>
          <div>
            Answers: {this.props.userAnswerQuestions.length}
            {/* <AnswerPanel list={this.props.userAnswerQuestions} /> */}
          </div>

        {/* {this.props.user.displayName} */}
          {/* Panels: */}
          <div className="user-panels">
            {/* Badges */}
            {/* Answers */} {/* Reputation */}
            {/* Questions */} {/* Tags */}
            {/* Votes */}
          </div>
          
          
        </div>
      </>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserShowPage);