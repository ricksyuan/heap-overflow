import React from 'react';
import { Route, Link } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../utils/route_util';

import Header from './header/header_container';
import LoginContainer from './session/login_container';
import SignupContainer from './session/signup_container';

const App = () => {
  return (
    <div>
      Hi
    </div>
  );
};

export default App;