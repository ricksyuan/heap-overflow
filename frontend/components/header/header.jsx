import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <div className="header-container">
      <div className="logo">
        <Link to="/">
          {/*TODO: IMAGE DOES NOT WORK. WHY? <img className="logo-img" src="/app/assets/images/logo.png"/>   */}
          <h1>Heap Overflow</h1>
        </Link>
      </div>
      <div className="search-bar">
        Search Bar {/* TODO: IMPLEMENT SEARCHBAR */}
      </div>
      {
        props.currentUser ? (
          <div>
            <button className="session-btn" onClick={props.logout}>Log Out</button>
          </div>
        ) : (
            <div className="session-btn">
              <Link to="/login">Log In</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )
      }
    </div>
  );
};

export default Header;

