/*global google*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import SearchResults from "./SearchResults.jsx";
import SearchMap from "./SearchMap.jsx";
import Geosuggest from "react-geosuggest";
import { Meteor } from "meteor/meteor";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      label: "San Jose, CA, USA",
      location: { lat: 37.3382082, lng: -121.88632860000001 },
      breweries: {}
    };
  }

  consultData() {
    Meteor.call(
      "breweries.get",
      { location: this.state.location },
      (err, res) => {
        if (err) {
          alert("There was error getting breweries check the console");
          console.log(err);
          //this.setState({error:err});
          return;
        }

        console.log("brewries received", res);
        this.setState({ breweries: res });
      }
    );
  }

  /**
   * When the input receives focus
   */
  onFocus() {
    console.log("onFocus");
  }

  /**
   * When the input loses focus
   */
  onBlur(value) {
    console.log("onBlur", value);
  }

  /**
   * When the input got changed
   */
  onChange(value) {
    console.log("input changes to :" + value);
    this.setState({ location: value.location, label: value.label });
    this.consultData();
  }

  /**
   * When a suggest got selected
   */
  onSuggestSelect(suggest) {
    console.log(suggest);
    //user has selected a suggestion
    this.setState({ location: suggest.location, label: suggest.label });
    this.consultData();
  }

  /**
   * When there are no suggest results
   */
  onSuggestNoResults(userInput) {
    console.log("onSuggestNoResults for :" + userInput);
  }

  componentDidUpdate(prevProps) {
    if (!this.compare(this.props.breweries, prevProps.breweries)) {
      this.setState({
        breweries: this.props.breweries
      });
    }
  }
  render() {
    var fixtures = [
      {
        label: "San Jose, CA, USA",
        location: { lat: 37.3382082, lng: -121.88632860000001 }
      },
      {
        label: "Pleasant Hill, CA, USA",
        location: { lat: 37.9479786, lng: -122.06079629999999 }
      },
      {
        label: "Santa Cruz, CA, USA",
        location: { lat: 36.97411709999999, lng: -122.03079630000002 }
      }
    ];
    return (
      <div>
        <Geosuggest
          ref={el => (this._geoSuggest = el)}
          placeholder="Start typing!"
          initialValue="Berlin, Germany"
          fixtures={fixtures}
          onSuggestSelect={this.onSuggestSelect}
          location={
            new google.maps.LatLng(52.52000659999999, 13.404953999999975)
          }
          radius="20"
        />
        <SearchResults
          breweries={this.state.breweries}
          location={this.state.location}
        />
        <SearchMap location={this.state.location} />
      </div>
    );
  }
}

SearchBar.propTypes = {
  breweries: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default SearchBar;
