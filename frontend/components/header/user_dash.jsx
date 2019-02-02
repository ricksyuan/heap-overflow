import React from 'react';
import { Link } from 'react-router-dom';
import md5 from 'md5';

const UserDash = ({currentUser}) => {
  const email = currentUser.email.trim().toLowerCase();
  const md5_hash = md5(email);
  return (
    <div className="user-dash">      
      <Link to={`/users/${currentUser.id}/${currentUser.displayName}`}>
        <img className="gravatar" src={`https://www.gravatar.com/avatar/${md5_hash}?s=24&r=pg&d=identicon`} />
        <div className="reputation" title="your reputation">
          {currentUser.reputation}
        </div>
        <div className="badges">
          <span title="1 gold badge">
            <span className="gold-badge">●</span>
            <span className="gold-badge-count">1</span>
          </span>
          <span title="2 silver badges">
            <span className="silver-badge">●</span>
            <span className="silver-badge-count">2</span>
          </span>
          <span title="4 bronze badges">
            <span className="bronze-badge">●</span>
            <span className="bronze-badge-count">4</span>
          </span>
        </div>
      </Link>
    </div>
  );
};

export default UserDash;