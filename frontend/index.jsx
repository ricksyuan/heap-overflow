// TODO: rename to heap_overflow.jsx ?

import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import { login, logout, signup } from './actions/session_actions';
import { fetchAllQuestions } from './actions/question_actions';
import { closePopup } from './actions/popup_actions';
import { postUser, postSession, deleteSession } from './utils/session_api_util';
import merge from 'lodash/merge';

document.addEventListener("DOMContentLoaded", () => {
  let store;
  if (window.currentUser) {
    const preloadedState = {
      session: { id: window.currentUser.id },
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }
  // TESTING START
  // we don't put the store directly on the window because
  // it can be confusing when debugging, sometimes giving you access to state
  // when you shouldn't
  window.getState = store.getState; // Just for testing!
  window.dispatch = store.dispatch; // Just for testing!
  window.postUser = postUser;
  window.postSession = postSession;
  window.deleteSession = deleteSession;
  window.login = login; // TEST: dispatch(login({user: {email: 'demo@example.com', password: 'password'}}))
  window.logout = logout; // TEST: dispatch(login({email: 'demo@example.com', password: 'password'}))
  window.signup = signup;
  window.merge = merge;
  window.fetchAllQuestions = fetchAllQuestions;
  // TESTING END
  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store} />, root);

  // Close popup whenever hash changes
  window.addEventListener('hashchange', function () {
    store.dispatch(closePopup());
  });
});
