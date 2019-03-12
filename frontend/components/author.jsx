import React from 'react';
import { Link } from 'react-router-dom';
import Gravatar from './gravatar';
import moment from 'moment';
import BadgeDisplay from './badge_display';

const Author = ({user, verb, date}) => {
  const dateMoment = moment(date);
  const day = dateMoment.format("MMM D [']YY"); // [] escapes
  const time = dateMoment.format("H:mm");
  return (
    <div className="author">
      <p className="user-action-time">{verb} {day} at {time}</p>
      <Gravatar size={32} hash={user.emailHash} float={true}/>
      <Link className="author-display-name-link" to={`/users/${user.id}/${user.displayName}`}>
        {user.displayName}
      </Link>
      <span className="post-reputation" title="reputation score">
        {user.reputation}
      </span>
      <BadgeDisplay
        goldCount="1"
        silverCount="2"
        bronzeCount="3"
      />
    </div>
  );
}

export default Author;