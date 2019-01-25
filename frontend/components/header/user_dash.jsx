import React from 'react';
import { Link } from 'react-router-dom';


const UserDash = ({currentUser}) => {
  return (
    <div className="header-user-dash">      
      <Link to={`/users/${currentUser.id}/${currentUser.displayName}`}> {currentUser.displayName} ({currentUser.reputation}) </Link>
    </div>
  );
};

export default UserDash;