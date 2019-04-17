import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import BrewMarker from "./BrewMarker.jsx";

/**
 *  A brewery map,
 *
 */
const BreweriesMap = withScriptjs(
  withGoogleMap(props => {
    //  console.log("BREWEIREISMAPPROPS", props);
    //maps through the incoming breweries, pass on infomation to the brewmarkers, in case we want to pass anything around
    const markers = props.breweries.map(brewery => {
      let marker = (
        <BrewMarker
          id={brewery.brewery.id}
          key={brewery.id}
          name={brewery.brewery.name}
          website_url={brewery.brewery.website_url}
          location={{
            lat: parseFloat(brewery.brewery.latitude),
            lng: parseFloat(brewery.brewery.longitude)
          }}
          activeMarker={brewery.id === props.activeMarker ? true : false}
          closeMarkers={props.closeOtherMarkers}
          onMarkerClick={props.onMarkerClick}
          brewery={brewery}
        />
      );
      return marker;
    });
    //return a google map, with whatever makers we want.
    return (
      <GoogleMap defaultZoom={14} center={props.location}>
        {markers}
      </GoogleMap>
    );
  })
);
export default BreweriesMap;
