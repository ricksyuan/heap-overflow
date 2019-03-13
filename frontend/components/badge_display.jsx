import React from 'react';

const BadgeDisplay = ({goldBadgeCount, silverBadgeCount, bronzeBadgeCount}) => {
  return (
    <span className="badges">
      <span title={`${goldBadgeCount} gold badge${goldBadgeCount > 1 ? 's' : ''}`}>
        <span className="gold-badge">●</span>
        <span className="gold-badge-count">{goldBadgeCount}</span>
      </span>
      <span title={`${silverBadgeCount} silver badge${silverBadgeCount > 1 ? 's' : ''}`}>
        <span className="silver-badge">●</span>
        <span className="silver-badge-count">{silverBadgeCount}</span>
      </span>
      <span title={`${bronzeBadgeCount} bronze badge${bronzeBadgeCount > 1 ? 's' : ''}`}>
        <span className="bronze-badge">●</span>
        <span className="bronze-badge-count">{bronzeBadgeCount}</span>
      </span>
    </span>
  );
};

export default BadgeDisplay;