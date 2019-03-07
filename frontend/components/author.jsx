import React from 'react';
import md5 from 'md5';
import moment from 'moment';
import BadgeDisplay from './badge_display';

const Author = ({user, verb, date}) => {
  const email = user.email.trim().toLowerCase();
  const md5_hash = md5(email);
  const dateMoment = moment(date);
  const day = dateMoment.format("MMM D [']YY"); // [] escapes
  const time = dateMoment.format("H:mm");
  return (
    <div className="author">
      <p className="user-action-time">{verb} {day} at {time}</p>
      <img className="gravatar-32 gravatar-post" src={`https://www.gravatar.com/avatar/${md5_hash}?s=32&r=pg&d=identicon`} />
      <div>{user.displayName}</div>
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