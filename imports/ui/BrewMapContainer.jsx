import React, { Component } from "react";
import PropTypes from "prop-types";
import BreweriesMap from "./BreweriesMap.jsx";

/** conatins the brewery map */
class BrewMapContainer extends Component {
  constructor(props) {
    super(props);

    //Breweires is a list of all the brewries, brewery is the brewery in focus, location is where to center
    this.state = {
      breweries: props.breweries,
      brewery: props.brewery,
      location: props.brewery.location,
      activeMarker: props.brewery.id
    };

    this.toggleShowPage = this.toggleShowPage.bind(this);

    this.closeOtherMarkers = this.closeOtherMarkers.bind(this);
  }

  //update currently when breweies have been updated
  componentDidUpdate(prevProps) {
    if (!this.compare(this.props.breweries, prevProps.breweries)) {
      this.setState({
        breweries: this.props.breweries
      });
    }
    if (this.props.brewery.id !== prevProps.brewery.id) {
      this.setState({
        brewery: this.props.brewery,
        activeMarker: this.props.brewery.id
      });
    }
  }

  //compares two arrays
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

  //only the active marker is rendered
  closeOtherMarkers(uid) {
    this.setState({ activeMarker: uid });
  }

  //toggle marker on map
  toggleShowPage() {
    alert("You clicked it");
    console.log("togglepageprops", this.props);
  }
  //moved serverside, should delete?
  // getLocation(incomingBrewery) {
  //   console.log("INCOMINGBREWERY", incomingBrewery);
  //   if (
  //     incomingBrewery.brewery.longitude === null ||
  //     incomingBrewery.brewery.longitude === "" ||
  //     incomingBrewery.brewery.longitude === undefined ||
  //     incomingBrewery.brewery.latitude === null ||
  //     incomingBrewery.brewery.latitude === "" ||
  //     incomingBrewery.brewery.latitude === undefined
  //   ) {
  //     let address =
  //       incomingBrewery.brewery.street +
  //       "," +
  //       incomingBrewery.brewery.city +
  //       "," +
  //       incomingBrewery.brewery.state;
  //     //3150 Polk St, San Francisco, CA 94109
  //     Meteor.call("address.location", address, (err, res) => {
  //       if (err) {
  //         //alert("There was error check the console");
  //         console.log(err);
  //         return;
  //       }
  //       if (res) {
  //         //alert("There was error check the console");
  //         //  console.log("getLocation", res);
  //         let lati = parseFloat(res.latitude);
  //         let longi = parseFloat(res.longitude);
  //         console.log("LATILONGGOOGLE", lati, longi);
  //         this.setState({ location: { lat: lati, lng: longi } });
  //         return { lat: lati, lng: longi };
  //       }
  //     });
  //   } else {
  //     return {
  //       lat: parseFloat(incomingBrewery.brewery.latitude),
  //       lng: parseFloat(incomingBrewery.brewery.longitude)
  //     };
  //   }
  // }

  /** renders a BreweriesMap, API key restricted */
  render() {
    //console.log("BREWMAPCONTAINERPROPS", this.props);
    //console.log("BREWERY LAT LNG", this.props.brewery);

    return (
      <BreweriesMap
        breweries={this.props.breweries}
        location={{
          lat: this.props.brewery.brewery.latitude,
          lng: this.props.brewery.brewery.longitude
        }}
        googleMapURL={
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyDklUg8DopxKO7mr8MTSMPxl_dukseRGLQ&v=3.exp&libraries=geometry,drawing,places"
        }
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "600px", width: "100%" }} />}
        mapElement={<div style={{ height: "100%" }} />}
        onMarkerClick={this.props.onMarkerClick}
        activeMarker={this.props.activeMarker}
        closeOtherMarkers={this.closeOtherMarkers}
        userLocaiton={this.props.location}
      />
    );
  }
}

//expects brewires and brewery
BrewMapContainer.propTypes = {
  breweries: PropTypes.arrayOf(PropTypes.object).isRequired,
  brewery: PropTypes.object.isRequired,
  onMarkerClick: PropTypes.func,
  activeMarker: PropTypes.number
};
export default BrewMapContainer;
