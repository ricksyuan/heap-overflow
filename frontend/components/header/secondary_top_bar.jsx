import React from 'react';
import { Link } from 'react-router-dom';
import UserDash from './user_dash';
import DropIcons from './drop_icons';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../../actions/session_actions';

const mapStateToProps = (state) => {
  return {
    currentUser: state.entities.users[state.session.id],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()).then(push),
  };
};

class SecondaryTopBar extends React.Component {

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logout().then(() => this.props.history.push('/login'));
  }

  render() {
    return (
      <>
        <div className="secondary-top-bar">
          {
            this.props.currentUser ? (
              <>
                <UserDash currentUser={this.props.currentUser} />
                <DropIcons />
                <button className="header-logout-btn primary-btn" onClick={this.handleLogout}>Logout</button>
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
      </>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SecondaryTopBar));