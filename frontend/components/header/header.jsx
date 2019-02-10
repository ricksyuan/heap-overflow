import React from 'react';

import Logo from './logo';
import SearchBar from './search_bar';
import SecondaryTopBar from './secondary_top_bar';

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <Logo />
        <SearchBar />
        <SecondaryTopBar />
      </div>
    </div>      
  );
};

export default Header;