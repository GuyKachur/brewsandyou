import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  InfoWindow
} from "react-google-maps";
import BrewMarker from "./BrewMarker.jsx";

const BreweriesMap = withScriptjs(
  withGoogleMap(props => {
    const markers = props.breweries.flat().map(brewery => {
      let marker = (
        <BrewMarker
          id={brewery.brewery.id}
          name={brewery.brewery.title}
          website_url={brewery.brewery.website_url}
          location={brewery.brewery.location}
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

    return (
      <GoogleMap defaultZoom={12} center={props.location}>
        {markers}
      </GoogleMap>
    );
  })
);
export default BreweriesMap;
