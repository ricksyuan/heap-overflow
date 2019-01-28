import React from 'react';

class SearchBar extends React.Component {
  
  handleChange(e) {
    console.log(e.currentTarget.value);
  }

  handleFocus(e) {
    console.log("Focused on search bar");
    // Show search button.
    const searchButton = document.querySelector(".search-button");
    searchButton.style.visibility = "visible";    
  }

  handleBlur(e) {
    console.log("Lost focus on search bar");
    // Hide focus.
    const searchButton = document.querySelector(".search-button");
    searchButton.style.visibility = "hidden";
  }

  handleSearchButtonClick(e) {
    console.log("Search button clicked");
  }


  render() {
    return (
      <div className="search-bar">
        <input onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange} className="search-bar-input" placeholder="Search..." />
        <button className="search-button" type="submit" onClick={this.handleSearchButtonClick}>
          <svg aria-hidden="true" className="svg-icon" width="18" height="18" viewBox="0 0 18 18"><path d="M12.86 11.32L18 16.5 16.5 18l-5.18-5.14v-.35a7 7 0 1 1 1.19-1.19h.35zM7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10z"></path></svg>
        </button>
      </div>
    );
  }

}
export default SearchBar;