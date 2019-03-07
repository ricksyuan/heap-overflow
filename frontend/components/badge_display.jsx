import React from 'react';

const BadgeDisplay = ({goldCount, silverCount, bronzeCount}) => {
  return (
    <div className="badges">
      <span title={`${goldCount} gold badge${goldCount > 1 ? 's' : ''}`}>
        <span className="gold-badge">●</span>
        <span className="gold-badge-count">{goldCount}</span>
      </span>
      <span title={`${silverCount} silver badge${silverCount > 1 ? 's' : ''}`}>
        <span className="silver-badge">●</span>
        <span className="silver-badge-count">{silverCount}</span>
      </span>
      <span title={`${bronzeCount} bronze badge${bronzeCount > 1 ? 's' : ''}`}>
        <span className="bronze-badge">●</span>
        <span className="bronze-badge-count">{bronzeCount}</span>
      </span>
    </div>
  );
};

export default BadgeDisplay;