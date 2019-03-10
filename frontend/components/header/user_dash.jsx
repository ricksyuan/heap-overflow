import React from 'react';
import { Link } from 'react-router-dom';
import BadgeDisplay from '../badge_display';
import Gravatar from '../gravatar';

const UserDash = ({currentUser}) => {
  return (
    <div className="user-dash">      
      <Link to={`/users/${currentUser.id}/${currentUser.displayName}`}>
        <Gravatar size={24} hash={currentUser.emailHash}/>
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