import React from 'react';
import { Link } from 'react-router-dom';
import UserDash from './user_dash';
import DropIcons from './drop_icons';

const SecondaryTopBar = (props) => {
  return (
    <div className="secondary-top-bar">
      {
        props.currentUser ? (
          <>
            <UserDash currentUser={props.currentUser} />
            <DropIcons />
            <button className="header-logout-btn hoverable-primary-btn" onClick={props.logout}>Logout</button>
          </>
        ) : (
          <>
            <DropIcons />
            <Link className="header-login-link" to="/login">Log In</Link>
            <Link className="header-signup-btn-link hoverable-primary-btn" to="/signup">Sign Up</Link>
          </>
        )
      }
      
    </div>
  );
};

export default SecondaryTopBar;