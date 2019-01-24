import React from 'react';
import { Route, Link } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../utils/route_util';

import LoginContainer from './session/login_container';
import SignupContainer from './session/signup_container';

const App = () => (
  <div class="page">
    <section class="item-a-header-logo">
      <div class="header-logo">
        <p>Heap Overflow Logo</p>
      </div>
    </section>
    <section class="item-b-header-search-bar">
      <input placeholder="Search..." />
    </section>

    <ul class="item-c-header-buttons">
      <Link className="header-login-link" to="/login">Log In</Link>
      <Link className="primary-btn header-signup-link " to="/signup">Sign Up</Link>
    </ul>
      
    <section class="item-d-left-nav-bar">
      <ul>
        <li><Link className="left-nav-bar-link" to="/">Home</Link></li>
        <li><Link className="left-nav-bar-link" to="/">PUBLIC</Link></li>
        <li><Link className="left-nav-bar-link" to="/">Stack Overflow</Link></li>
        <li><Link className="left-nav-bar-link" to="/">Tags</Link></li>
        <li><Link className="left-nav-bar-link" to="/">Users</Link></li>        
      </ul>
    </section>
    { 
      true ? ( // TODO: make dynamic
    <main class="item-ef-session">
      <div class="session-form-container">
      <AuthRoute exact path="/login" component={LoginContainer} />
      <AuthRoute exact path="/signup" component={SignupContainer} />      
      </div>      
    </main>
      ) : (
        <>
          <main class="item-e-questions">          
            Questions
          </main>
          <aside class="item-f-sidebar">
            Right Sidebar inside content
          </aside>
        </>
      )
    }
    <footer>
      Footer
    </footer>
  </div>
);

export default App;