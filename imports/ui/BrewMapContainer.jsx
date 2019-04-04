import React, { Component } from "react";
import PropTypes from "prop-types";
import BreweriesMap from "./BreweriesMap.jsx";
import { Meteor } from "meteor/meteor";

class BrewMapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      breweries: props.breweries,
      brewery: props.brewery,
      location: props.brewery.location
    };
  }

  componentDidUpdate(prevProps) {
    if (!this.compare(this.props.breweries, prevProps.breweries)) {
      this.setState({
        breweries: this.props.breweries
      });
    }
  }

  compare(arr1, arr2) {
    if (!arr1 || !arr2) return false;
    if (arr1.length === 0 && arr2.length === 0) {
      return true;
    }
    let result = true;

    arr1.forEach(e1 =>
      arr2.forEach(e2 => {
        if (e1.length > 1 && e2.length) {
          result = this.compare(e1, e2);
        } else if (e1 !== e2) {
          result = false;
          return false;
        } else {
          result = true;
        }
      })
    );

    return result;
  }

  closeOtherMarkers(uid) {
    this.setState({ activeMarker: uid });
  }

  toggleShowPage() {
    alert("You clicked it");
  }

  getLocation(incomingBrewery) {
    if (
      incomingBrewery.brewery.longitude === null ||
      incomingBrewery.brewery.latitude === null
    ) {
      let address =
        incomingBrewery.brewery.street +
        "," +
        incomingBrewery.brewery.city +
        "," +
        incomingBrewery.brewery.state;
      //3150 Polk St, San Francisco, CA 94109
      Meteor.call("address.location", address, (err, res) => {
        if (err) {
          //alert("There was error check the console");
          console.log(err);
          return;
        }
        if (res) {
          //alert("There was error check the console");
          //  console.log("getLocation", res);
          this.setState({ location: res });
          return { locaiton: res };
        }
      });
    } else {
      return {
        location: {
          lat: incomingBrewery.brewery.latitude,
          lng: incomingBrewery.brewery.longitude
        }
      };
    }
  }

  //// TODO: adding the ability for the map to make calls against the brewery database for locations close to the location....
  render() {
    return (
      <BreweriesMap
        breweries={this.props.breweries}
        location={this.getLocation(this.props.brewery)}
        googleMapURL={
          "https://maps.googleapis.com/maps/api/js?key=APIKEY&v=3.exp&libraries=geometry,drawing,places"
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

BrewMapContainer.propTypes = {
  breweries: PropTypes.arrayOf(PropTypes.object).isRequired,
  brewery: PropTypes.object.isRequired
};
export default BrewMapContainer;
