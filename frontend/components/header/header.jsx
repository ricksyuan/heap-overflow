import React from 'react';

import Logo from './logo';
import SearchBar from './../search/search_bar';
import SecondaryTopBar from './secondary_top_bar';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    parsedQueryString: state.ui.query.parsedString,
  }
}

const Header = (props) => {
  return (
    <div className="header">
      <div className="header-contents">
        <Logo />
        <SearchBar key={props.parsedQueryString} searchButton={true}/>
        <SecondaryTopBar />
      </div>
    </div>      
  );
};

export default connect(mapStateToProps)(Header);