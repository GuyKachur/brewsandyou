import React, { Component } from "react";
import PropTypes from "prop-types";
import SearchBar from "./SearchBar.jsx";

class SearchContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <SearchBar />
      </div>
    );
  }
}

SearchContainer.propTypes = {
  owner: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired
};

export default SearchContainer;
