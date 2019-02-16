import React from 'react';

import Logo from './logo';
import SearchBar from './../search/search_bar';
import SecondaryTopBar from './secondary_top_bar';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    parsedQuery: state.ui.parsedQuery || "",
  }
}

const Header = (props) => {
  return (
    <div className="header">
      <div className="header-contents">
        <Logo />
        <SearchBar key={props.parsedQuery} searchButton={true}/>
        <SecondaryTopBar />
      </div>
    </div>      
  );
};

export default connect(mapStateToProps)(Header);