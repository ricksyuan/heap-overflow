import React from 'react';
import { Route, Link } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../utils/route_util';
import HeaderContainer from './header/header_container';

import LoginContainer from './session/login_container';
import SignupContainer from './session/signup_container';

const App = () => (
  <div class="page">
    
    <header class="header">
      Header
      <Route path="/" component={HeaderContainer}/>
    </header>
    <aside class="nav">
      Left Sidebar (Nav)
    </aside>

    <main class="content">
      <h1>Content</h1>
      <AuthRoute exact path="/login" component={LoginContainer} />
      <AuthRoute exact path="/signup" component={SignupContainer} />
      <aside class="sidebar">
        Right Sidebar inside content
      </aside>
    </main>
    
    <footer class="footer">
      Footer
    </footer>
  </div>
);

export default App;