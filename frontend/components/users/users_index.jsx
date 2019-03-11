import React from 'react';
import UserInfoBox from './user_info_box';
import PageControl from './page_control';

class UsersIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const pageUserInfoBoxes = [];
    const {page, users} = this.props;
    page.pageUserIds.forEach(pageUserId => {
      const pageUser = users[pageUserId];
      pageUserInfoBoxes.push(<UserInfoBox key={pageUser.id} user={pageUser} />);
    })
    return (
      <>
        <div className="users-index-user-grid">
          {pageUserInfoBoxes}
        </div>
        <PageControl page={page}/>
      </>
    );
  }

}

export default UsersIndex;