import React from 'react';
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
    <div className='nav'>
      <Route path='/' component={Nav}/>
    </div>
    <div>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis quasi expedita sapiente dolorem accusamus! Molestias laborum error voluptates eum repellendus, quod esse, ullam obcaecati a eveniet nam eligendi hic dolorum!
    </div>
    <Switch>

    </Switch>
    <AuthRoute exact path='/login' component={Login}/>
    <AuthRoute exact path='/signup' component={Signup} />
  </div>
);

export default App;