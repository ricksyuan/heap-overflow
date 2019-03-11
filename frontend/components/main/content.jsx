import React from 'react';
import LoginContainer from '../session/login_container';
import SignupContainer from '../session/signup_container';
import { AuthRoute, ProtectedRoute } from '../../utils/route_util';
import { Switch, Route } from 'react-router';
import TopQuestionsIndex from '../questions/index/top_questions_index';
import AskQuestionForm from '../questions/create/ask_question_form';
import QuestionPage from '../questions/show/question_page';
import Popup from '../../components/popup/popup';
import SearchPage from '../../components/search/search_page';
import TagsPage from '../../components/tags/tags_page';
import UserShowPage from '../../components/users/user_show_page';
import UsersIndexPage from '../../components/users/users_index_page';

const Content = () => {
  return (
    <div className="content">
      <Popup />
      <Route exact path="/" component={TopQuestionsIndex} />
      <Route path="/search" component={SearchPage} />
      <Route path="/tags" component={TagsPage} />
      <Switch>
        <Route exact path="/users/page/:pageNum" component={UsersIndexPage} />
        <Route exact path="/users/:userId/:displayName" component={UserShowPage} />
      </Switch>
      <Switch>
        <ProtectedRoute exact path="/questions/ask" component={AskQuestionForm} />
        <Route exact path="/questions/:questionId" component={QuestionPage} />
      </Switch>
      <div className="session-page">
        <AuthRoute exact path="/login" component={LoginContainer} />
        <AuthRoute exact path="/signup" component={SignupContainer} />        
      </div>

    </div>
  );
};

export default Content;