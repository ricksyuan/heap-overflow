import React from 'react';
import { Link } from 'react-router-dom';

class CommentPopup extends React.Component {
  

  constructor(props) {
    super(props);
  }
  
  
  render () {
    return (
      <>
        <h2 className="popup-title-container" onClick={this.titleClicked}>
          <span className="popup-title">
            Your feedback is appreciated!
          </span>
        </h2>
        <p>Commenting requires being signed in.</p>

        <p>Setting up an account is free and open to everyone. Set up your account today and earn extra privileges like posting, commenting and voting.</p>

        <span className="popup-link-container">
          <Link className="popup-signup-link" to="/signup">Sign up</Link> or <Link className="popup-login-link" to="/login">log in</Link>
        </span>
      </>
    );
  }
}

export default CommentPopup;