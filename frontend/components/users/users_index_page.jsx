import React from 'react';
import { connect } from 'react-redux';
import { fetchAllUsers } from '../../actions/user_actions';
import UsersIndex from './users_index';

const mapStateToProps = (state) => {
  return {
    users: state.entities.users,
    page: state.ui.page,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUsers: (pageNum) => dispatch(fetchAllUsers(pageNum)),
  };
}


class UsersIndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    // Default to first page if no page param
    const pageNum = this.props.match.params.pageNum;
    this.props.fetchAllUsers(pageNum).then(() => {
      this.setState({
        loaded: true,
      })
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.page.pageNum && prevProps.page.pageNum !== this.props.match.params.pageNum) {
      this.props.fetchAllUsers(this.props.match.params.pageNum).then(() => {
        this.setState({
          loaded: true,
        })
      });
    }
  }

  render() {
    if (!this.state.loaded) return <></>;
    return (
      <>
        <div className="users-index-page">
          <div className="users-index-page-content-header">
            <h1 className="users-index-page-content-headline">Users</h1>
          </div>
          <div>
            <UsersIndex page={this.props.page} users={this.props.users}/>
          </div>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersIndexPage);