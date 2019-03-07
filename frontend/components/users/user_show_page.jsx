import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    state: 
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserProfile: (userId )=> dispatch(fetchUserProfile(userId),
  };
};

class UserShowPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // fetch user
  }

  render() {
    return (
      <>
        <div className="user-show-page">
        
          {/* Panels: */}
          {/* Badges */}
          {/* Answers */} {/* Reputation */}
          {/* Questions */} {/* Tags */}
          {/* Votes */}
        </div>
      </>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserShowPage);