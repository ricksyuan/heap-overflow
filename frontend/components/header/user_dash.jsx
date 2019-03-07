import React from 'react';
import { Link } from 'react-router-dom';
import md5 from 'md5';
import BadgeDisplay from '../badge_display';

const UserDash = ({currentUser}) => {
  const email = currentUser.email.trim().toLowerCase();
  const md5_hash = md5(email);
  return (
    <div className="user-dash">      
      <Link to={`/users/${currentUser.id}/${currentUser.displayName}`}>
        <img className="gravatar" src={`https://www.gravatar.com/avatar/${md5_hash}?s=24&r=pg&d=identicon`} />
        <div className="user-dash-reputation" title="your reputation">
          {currentUser.reputation}
        </div>
        <BadgeDisplay 
          goldCount="1"
          silverCount="2"
          bronzeCount="3"
        />
      </Link>
    </div>
  );
};

export default UserDash;