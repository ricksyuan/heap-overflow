import React from 'react';
import { Link } from 'react-router-dom';
import UserDash from './user_dash';
import DropIcons from './drop_icons';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';

const mapStateToProps = (state) => {
  return {
    currentUser: state.entities.users[state.session.id],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()).then(),
  };
};

const SecondaryTopBar = (props) => {
  return (
    <div className="secondary-top-bar">
      {
        props.currentUser ? (
          <>
            <UserDash currentUser={props.currentUser} />
            <DropIcons />
            <button className="header-logout-btn primary-btn" onClick={props.logout}>Logout</button>
          </>
        ) : (
          <>
            <DropIcons />
            <Link className="header-login-link" to="/login">Log In</Link>
            <Link className="header-signup-btn-link primary-btn" to="/signup">Sign Up</Link>
          </>
        )
      }
      
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SecondaryTopBar);
