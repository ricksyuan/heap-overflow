import React from 'react';
import { connect } from 'react-redux';
import { fetchAllUsers } from '../../actions/user_actions';
import UserInfoBox from './user_info_box';

const mapStateToProps = (state) => {
  return {
    users: Object.values(state.entities.users),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUsers: () => dispatch(fetchAllUsers()),
  };
}

class UsersIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    this.props.fetchAllUsers().then(() => {
      this.setState({
        loaded: true,
      })
    });
  }

  render() {
    if (!this.state.loaded) return <></>;
    const userInfoBoxes = this.props.users.map(user => {
      return <UserInfoBox key={user.id} user={user} />;
    });
    return (
      <>
        <div className="users-index-user-grid">
          {userInfoBoxes}
        </div>
      </>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(UsersIndex);