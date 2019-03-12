import React from 'react';
import Gravatar from '../gravatar';
import BadgeDisplay from '../badge_display';



const formatter = new Intl.NumberFormat('en-US', {
  style: 'decimal',
});

const AvatarCard = ({hash, displayName, reputation, badges}) => {
  return (
    <>
      <div className='avatar-card'>
        <div>
          <Gravatar size={164} hash={hash} />
        </div>
        <div className="avatar-card-display-name">
          {displayName}
        </div>
        <div>
          <span className="avatar-card-reputation-score">{formatter.format(reputation)}</span>
          <span className="avatar-card-reputation-number"> REPUTATION</span>
        </div>
        <div>
          <BadgeDisplay
            goldCount="1"
            silverCount="2"
            bronzeCount="3"
          />
        </div>
      </div>
    </>
  );
};

export default AvatarCard;