import React from 'react';
import { Link } from 'react-router-dom';

const UserInfoBox = ({user}) => {
  return (
    <>
      <li className="user-info-box-li">
        <div className="gravatar-48 gravatar-float user-info-box-gravatar">
          <img src={`https://www.gravatar.com/avatar/${user.emailHash}?s=48&r=pg&d=identicon`} />
        </div>
        <Link className="user-info-box-display-name-link" to={`/users/${user.id}/${user.displayName}`}>
          {user.displayName}
        </Link>
        <div className="user-info-box-user-location">
          {user.location}
        </div>
        <div className="user-info-box-user-reputation">
          {user.reputation}
        </div>
      </li>
    </>
  );
};

export default UserInfoBox;