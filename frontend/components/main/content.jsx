import React from 'react';
import LoginContainer from '../session/login_container';
import SignupContainer from '../session/signup_container';
import { AuthRoute, ProtectedRoute } from '../../utils/route_util';
import { Switch, Route } from 'react-router';
import TopQuestionsIndex from '../questions/top_questions_index';
import AskQuestionForm from '../questions/ask_question_form';
const Content = () => {
  return (
    <div className="content">
        <Route exact path="/" component={TopQuestionsIndex} />
        <ProtectedRoute exact path="/questions/ask" component={AskQuestionForm} />

        <div className="session-page">
          <AuthRoute exact path="/login" component={LoginContainer} />
          <AuthRoute exact path="/signup" component={SignupContainer} />
        </div>

    </div>
  );
};

export default Content;