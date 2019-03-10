import React from 'react';
import UsersIndex from './users_index';

class UsersIndexPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      <>
        <div className="users-index-page">
          <div className="users-index-page-content-header">
            <h1 className="users-index-page-content-headline">Users Page</h1>
          </div>
          <div>
            
            <UsersIndex />
          </div>
        </div>
      </>
    );
  }
}

export default UsersIndexPage;