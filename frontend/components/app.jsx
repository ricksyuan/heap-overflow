import React from 'react';
<<<<<<< HEAD
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
=======
import {  
  Switch,
  Link,
  Route,
} from 'react-router-dom';

import Login from './session/login_container';
import Signup from './session/signup_container';

import { AuthRoute, ProtectedRoute } from '../utils/route_util';
import Nav from './nav/nav_container.jsx';

// Implicit return
// Make <h1>Heap Overflow</h1> a clickable image with logo
const App = () => (
  <div>
    <header className='nav'>
      <Route path='/' component={Nav}/>
    </header>
    <aside>
      <h2>Sidebar</h2>
      <ul>
        <li>Lorem ipsum dolor,</li>
        <li>sit amet consectetur adipisicing elit.</li>
        <li>Veniam natus mollitia sunt veritatis atque a fugiat sed sit voluptas,</li>
        <li>inventore impedit. Possimus aliquid provident vel fugiat repellat</li>
        <li>assumenda ratione temporibus?</li>
      </ul>
    </aside>
    <section>
      <h2>Main Content</h2>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis quasi expedita sapiente dolorem accusamus! Molestias laborum error voluptates eum repellendus, quod esse, ullam obcaecati a eveniet nam eligendi hic dolorum!
    </section>
    <Switch>

    </Switch>
    <AuthRoute exact path='/login' component={Login}/>
    <AuthRoute exact path='/signup' component={Signup} />
>>>>>>> a22841df667f58e82a03d91dc255bec5792ba468
  </div>
);

export default App;