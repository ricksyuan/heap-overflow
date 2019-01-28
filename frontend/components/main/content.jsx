import React from 'react';
import LoginContainer from '../session/login_container';
import SignupContainer from '../session/signup_container';
import { AuthRoute } from '../../utils/route_util';
import { Switch, Route } from 'react-router';
import TopQuestions from '../questions/top_questions';
const Content = () => {
  return (
    <div className="content">
        <Route exact path="/" component={TopQuestions} />
        <div className="session-page">
          <AuthRoute exact path="/login" component={LoginContainer} />
          <AuthRoute exact path="/signup" component={SignupContainer} />
        </div>

    </div>
  );
};

export default Content;