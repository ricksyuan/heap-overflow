import React from 'react';
import { Link } from 'react-router-dom';
import UserDash from './user_dash';

const Header = (props) => {
  return (
    <>
      <section className="item-a-header-logo">
        <div className="header-logo">
          <img className="header-logo-img" src={window.headerLogo}/>
        </div>
      </section>
      <section className="item-b-header-search-bar">
        <input placeholder="Search..." />
      </section>
      <ul className="item-c-header-buttons">
        {
          props.currentUser ? (
            <>
              <UserDash currentUser={props.currentUser} />
              <button className="header-logout-btn hoverable-primary-btn" onClick={props.logout}>Logout</button>
            </>
          ) : (
            <>
              <Link className="header-login-link" to="/login">Log In</Link>
              <Link className="header-signup-btn hoverable-primary-btn" to="/signup">Sign Up</Link>
            </>
          )
        }
       
      </ul>
    </>
  );
};

export default Header;