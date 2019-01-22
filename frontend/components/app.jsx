import React from 'react';
import {
  Switch,
  Link,
} from 'react-router-dom';

// Implicit return
// Make <h1>Heap Overflow</h1> a clickable image with logo
const App = () => (
  <div>
    <header>
      <Link to="/" className="header-link">
        <h1>Heap Overflow</h1>
      </Link>
    </header>
    <Switch>

    </Switch>
  </div>
);

export default App;