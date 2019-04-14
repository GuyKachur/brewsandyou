import React from "react";
// Code review from Yibo Zhao
// Can you believe that react-google-maps and google-map-react are two different React component libraries even though they have similar names.
// And google-map-react is not compatible with Meteor.
// I should try to consider substitute Mapbox with react-google-maps in project 5. Thanks for your help.
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  InfoWindow
} from "react-google-maps";
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
          activeMarker={
            brewery.brewery.id === props.activeMarker ? true : false
          }
          closeMarkers={props.closeOtherMarkers}
          toggleShowPage={props.toggleShowPage}
          brewery={brewery}
        >
          <InfoWindow visible={true}>
            <h1>{"Guy"}</h1>
          </InfoWindow>
        </BrewMarker>
      );
      return marker;
    });
    //return a google map, with whatever makers we want.
    return (
      <GoogleMap defaultZoom={12} center={props.location}>
        {markers}
      </GoogleMap>
    );
  })
);
export default BreweriesMap;
