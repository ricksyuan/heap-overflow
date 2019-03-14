import React from 'react';
import { Link } from 'react-router-dom';

const BadgePanel = ({ badges }) => {
  const badgeListItems = badges.map((badge, index) => {
    let badgeClassName;
    if (badge.badgeType == 1) {
      badgeClassName = "user-show-page-gold-badge-text";
    } else if (badge.badgeType == 2) {
      badgeClassName = "user-show-page-silver-badge-text";
    } else if (badge.badgeType == 3) {
      badgeClassName = "user-show-page-bronze-badge-text";
    }
    return (
      <li className="user-show-page-panel-list-item" key={index}>
        <span className={badgeClassName}>{badge.name}</span>
      </li>
    );
  });
  return (
    <div className="user-show-page-badge-panel">
      <div className="user-show-page-panel-header">
        <span>
          Badge{badges.length > 1 && "s"}:{" "}
        </span>
        <span className="user-show-page-panel-count">
          ({badges.length})
        </span>
      </div>
      <ul>
        {badgeListItems}
      </ul>
    </div>
  );
};

export default BadgePanel;