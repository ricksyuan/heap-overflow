import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
      <Link className="header-logo-link" to="/">
        <img className="header-logo-img" src={window.headerLogo} />
      </Link>
  );
};

export default Logo;