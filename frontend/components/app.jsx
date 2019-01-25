import React from 'react';
import { Route, Link } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../utils/route_util';

import Header from './header/header_container';
import LoginContainer from './session/login_container';
import SignupContainer from './session/signup_container';

const App = () => {
  return (
    <div className="page">
      <Header />
      <section className="item-d-left-nav-bar">
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
      <main className="item-ef-session">
        <div className="session-page">
          <AuthRoute exact path="/login" component={LoginContainer} />
          <AuthRoute exact path="/signup" component={SignupContainer} />      
        </div>
        {/* <div className="user-show-page"/>
          <Route exact path={`/users/$
          {current}`} component={LoginContainer} />
        </div> */}
      </main>
        ) : (
          <>
            <main className="item-e-questions">          
              Questions
            </main>
            <aside className="item-f-sidebar">
              Right Sidebar inside content
            </aside>
          </>
        )
      }
      <footer>
        Footer
      </footer>
    </div>
  )
};

export default App;