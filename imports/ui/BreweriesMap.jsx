import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer
} from "react-google-maps";
import BrewMarker from "./BrewMarker.jsx";

function distanceCalc(userLocation, latlng) {
  var directionsService = new google.maps.DirectionsService();
  var request = {
    origin: userLocation, // LatLng|string
    destination: latlng, // LatLng|string
    travelMode: google.maps.DirectionsTravelMode.DRIVING
  };

  directionsService.route(request, function(response, status) {
    if (status === "OK") {
      var point = response.routes[0].legs[0];
      return { duration: point.duration.text, distance: point.distance.text };
    } else {
      return { duration: -1, distance: -1 };
    }
  });
}

const google = window.google;
/**
 *  A brewery map,
 *
 */
const BreweriesMap = withScriptjs(
  withGoogleMap(props => {
    console.log("BREWEIREISMAPPROPS", props);
    //maps through the incoming breweries, pass on infomation to the brewmarkers, in case we want to pass anything around
    const markers = props.breweries.map(brewery => {
      // let distance = distanceCalc(props.userLocation, {
      //   lng: brewery.brewery.longitude,
      //   lat: brewery.brewery.latitude
      // });
      //           // durationdistance={distance}
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
    console.log("props in maps", props);
    // userLocation@0.8x.png
    if (props.userLocaiton) {
      let userLocation = (
        <Marker
          title={"User Location"}
          key="userLocaiton"
          position={props.userLocaiton}
          icon={"userLocation@0.8x.png"}
        />
      );
      markers.push(userLocation);
    }

    //return a google map, with whatever makers we want.
    return (
      <GoogleMap defaultZoom={15} center={props.location}>
        {markers}
      </GoogleMap>
    );
  })
);
export default BreweriesMap;
