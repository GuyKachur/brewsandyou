import React, { Component } from "react";
import PropTypes from "prop-types";
import BreweriesMap from "./BreweriesMap.jsx";

class SearchMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breweries: this.props.breweries,
      location: this.props.location,
      activeMarker: null
    };
  }

  componenetDidUpdate(nextProps) {
    if (nextProps.breweries !== this.props.breweries) {
      this.setState({
        breweries: nextProps.breweries,
        location: nextProps.location
      });
    }
  }

  closeOtherMarkers(uid) {
    this.setState({ activeMarker: uid });
  }

  toggleShowPage() {
    alert("Book Rented!");
  }

  render() {
    return (
      <BreweriesMap
        breweries={this.props.breweries}
        location={this.props.location}
        googleMapURL={
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyBnAAq2EJ8xiHsTmyUu3D2Ba_OWO8DoUEE&v=3.exp&libraries=geometry,drawing,places"
        }
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "600px", width: "100%" }} />}
        mapElement={<div style={{ height: "100%" }} />}
        toggleShowPage={this.toggleShowPage}
        activeMarker={this.state.activeMarker}
        closeOtherMarkers={this.closeOtherMarkers}
      />
    );
  }
}

SearchMap.propTypes = {
  breweries: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.string.isRequired
};
export default SearchMap;
