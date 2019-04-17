import React, { Component } from "react";
import { debounce } from "throttle-debounce";
import Autosuggest from "react-autosuggest";
import { Meteor } from "meteor/meteor";
import BrewMapContainer from "./BrewMapContainer.jsx";
import BreweriesList from "./BreweriesList.jsx";
import PropTypes from "prop-types";
import BreweryCard from "./BreweryCard";

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
  <div className="text-lg p-4">{suggestion.name}</div>
);

//Hardcoded breweries, should work without now thos
const sanJoseBreweries = [
  {
    _id: "yer9ihDCYziYEBAS5",
    createdAt: 1554427487482,
    brewery: {
      id: 456,
      name: "Camino Brewing Co LLC",
      brewery_type: "micro",
      street: "718 S 1st St",
      city: "San Jose",
      state: "California",
      postal_code: "95113",
      country: "United States",
      longitude: -121.882347823612,
      latitude: 37.3253017839889,
      phone: "",
      website_url: "http://www.caminobrewing.com",
      updated_at: "2018-08-23T23:26:25.248Z",
      tag_list: []
    },
    id: 456,
    comments: [],
    usersWhoRated: [],
    rating: 0
  },
  {
    _id: "xiAY8xRKKgfs6Sy2N",
    createdAt: 1554427487493,
    brewery: {
      id: 623,
      name: "Geartooth AleWerks",
      brewery_type: "micro",
      street: "1635 S 7th St",
      city: "San Jose",
      state: "California",
      postal_code: "95112-5932",
      country: "United States",
      longitude: -121.866477333785,
      latitude: 37.315251291037,
      phone: "4084832679",
      website_url: "http://www.geartoothalewerks.com",
      updated_at: "2018-08-23T23:28:45.233Z",
      tag_list: []
    },
    id: 623,
    comments: [],
    usersWhoRated: [],
    rating: 0
  },
  {
    _id: "YuexL9FioGnnoLCqn",
    createdAt: 1554427487496,
    brewery: {
      id: 667,
      name: "Hermitage Brewing Company",
      brewery_type: "regional",
      street: "1627 S 7th St",
      city: "San Jose",
      state: "California",
      postal_code: "95112-5932",
      country: "United States",
      longitude: -121.866525688348,
      latitude: 37.3153140881948,
      phone: "4082910966",
      website_url: "http://www.hermitagebrewing.com",
      updated_at: "2018-08-23T23:29:21.773Z",
      tag_list: []
    },
    id: 667,
    comments: [],
    usersWhoRated: [],
    rating: 0
  },
  {
    _id: "pYN862GPBEvhbjHWG",
    createdAt: 1554427487503,
    brewery: {
      id: 377,
      name: "Bison Brewing Co",
      brewery_type: "contract",
      street: "1627 S 7th St",
      city: "San Jose",
      state: "California",
      postal_code: "95112-5932",
      country: "United States",
      longitude: -121.866525688348,
      latitude: 37.3153140881948,
      phone: "5108125996",
      website_url: "http://bisonbrew.com",
      updated_at: "2018-08-23T23:25:25.802Z",
      tag_list: []
    },
    id: 377,
    comments: [],
    usersWhoRated: [],
    rating: 0
  },
  {
    _id: "iBDDouW5uTLaMDPon",
    createdAt: 1554427487506,
    brewery: {
      id: 441,
      name: "Brewtality",
      brewery_type: "contract",
      street: "930 McLaughlin Ave",
      city: "San Jose",
      state: "California",
      postal_code: "95122-2611",
      country: "United States",
      longitude: -121.8541694,
      latitude: 37.3331712,
      phone: "3104023349",
      website_url: "http://www.brewtality.com",
      updated_at: "2018-08-23T23:26:12.593Z",
      tag_list: []
    },
    id: 441,
    comments: [],
    usersWhoRated: [],
    rating: 0
  },
  {
    _id: "2TdcCWG4wTQTWPRJK",
    createdAt: 1554427487514,
    brewery: {
      id: 636,
      name: "Gordon Biersch Brewing Co",
      brewery_type: "regional",
      street: "357 E Taylor St",
      city: "San Jose",
      state: "California",
      postal_code: "95112-3105",
      country: "United States",
      longitude: -121.8841169,
      latitude: 37.3567304,
      phone: "4082781008",
      website_url: "http://www.gordonbiersch.com",
      updated_at: "2018-08-23T23:28:56.213Z",
      tag_list: []
    },
    id: 636,
    comments: [],
    usersWhoRated: [],
    rating: 0
  },
  {
    _id: "vkaW2LyyDrpfRt3at",
    createdAt: 1554427487517,
    brewery: {
      id: 655,
      name: "Hapa's Brewing Company",
      brewery_type: "micro",
      street: "460 Lincoln Ave # 90",
      city: "San Jose",
      state: "California",
      postal_code: "95126-3702",
      country: "United States",
      longitude: -121.888991,
      latitude: 37.2917841,
      phone: "4089823299",
      website_url: "http://hapasbrewing.com/",
      updated_at: "2018-08-23T23:29:11.473Z",
      tag_list: []
    },
    id: 655,
    comments: [],
    usersWhoRated: [],
    rating: 0
  },
  {
    _id: "akREwgnaKuJ365zF8",
    createdAt: 1554427487522,
    brewery: {
      id: 985,
      name: "Santa Clara Valley Brewing",
      brewery_type: "micro",
      street: "101 E Alma Ave",
      city: "San Jose",
      state: "California",
      postal_code: "95112-5944",
      country: "United States",
      longitude: -121.873871843909,
      latitude: 37.3163530780456,
      phone: "4082885181",
      website_url: "http://www.scvbrewing.com",
      updated_at: "2018-08-24T00:02:06.427Z",
      tag_list: []
    },
    id: 985,
    comments: [],
    usersWhoRated: [],
    rating: 0
  },
  {
    _id: "HhgscvRPW6vyzND3R",
    createdAt: 1554427487524,
    brewery: {
      id: 1033,
      name: "South Bay Brewco",
      brewery_type: "contract",
      street: "930 McLaughlin Ave",
      city: "San Jose",
      state: "California",
      postal_code: "95122-2611",
      country: "United States",
      longitude: -121.8541694,
      latitude: 37.3331712,
      phone: "4082193696",
      website_url: "",
      updated_at: "2018-08-24T00:02:50.318Z",
      tag_list: []
    },
    id: 1033,
    comments: [],
    usersWhoRated: [],
    rating: 0
  },
  {
    _id: "p9jsqJ4G8caTFAXht",
    createdAt: 1554427487531,
    brewery: {
      id: 1157,
      name: "Uproar Brewing",
      brewery_type: "brewpub",
      street: "439 S 1st St",
      city: "San Jose",
      state: "California",
      postal_code: "95113-2816",
      country: "United States",
      longitude: -121.885637335649,
      latitude: 37.329391892769,
      phone: "4086732266",
      website_url: "http://www.uproarbrewing.com",
      updated_at: "2018-08-24T00:04:40.236Z",
      tag_list: []
    },
    id: 1157,
    comments: [],
    usersWhoRated: [],
    rating: 0
  },
  {
    _id: "J6EMxQp7t9FM2MyuG",
    createdAt: 1554427487533,
    brewery: {
      id: 1171,
      name: "Whole Foods Market Brewing Company- Floodcraft Brewing",
      brewery_type: "brewpub",
      street: "777 The Alameda",
      city: "San Jose",
      state: "California",
      postal_code: "95126-3155",
      country: "United States",
      longitude: -121.9087451,
      latitude: 37.3315931,
      phone: "4082071126",
      website_url: "http://floodcraftbrewing.com/",
      updated_at: "2018-08-24T00:04:53.123Z",
      tag_list: []
    },
    id: 1171,
    comments: [],
    usersWhoRated: [],
    rating: 0
  }
];

/** Top level item for functionality stack */
class CompleteSearchBar extends Component {
  // updateBreweries(response) {
  //   console.log("udate reweroesd " + response);
  //   this.setState(response.data);
  // }
  constructor(props) {
    super(props);

    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(
      this
    );
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(
      this
    );
    this.onBreweryClick = this.onBreweryClick.bind(this);
    this.onChange = this.onChange.bind(this);

    this.goToBrewery = this.goToBrewery.bind(this);

    this.debouncedGetSuggestions = debounce(500, this.getSuggestions);
    //
    // let sanJoseBreweries = Meteor.call("breweries.byCityState", {
    //   city: "San Jose",
    //   state: "California"
    // });

    this.state = {
      value: "",
      brewery: {
        _id: "J6EMxQp7t9FM2MyuG",
        createdAt: 1554427487533,
        brewery: {
          id: 1171,
          name: "Whole Foods Market Brewing Company- Floodcraft Brewing",
          brewery_type: "brewpub",
          street: "777 The Alameda",
          city: "San Jose",
          state: "California",
          postal_code: "95126-3155",
          country: "United States",
          longitude: -121.9087451,
          latitude: 37.3315931,
          phone: "4082071126",
          website_url: "http://floodcraftbrewing.com/",
          updated_at: "2018-08-24T00:04:53.123Z",
          tag_list: []
        },
        id: 1171,
        comments: [],
        rating: 0
      },
      suggestions: [], //list of brewery id's and names
      breweries: sanJoseBreweries //maybe .flat()
    };
  }

  componentDidMount() {
    let location = { lng: -121.882347823612, lat: 37.3253017839889 };
    let cityState = { city: "San Francisco", state: "California" };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((res, err) => {
        if (err) {
          console.log("geolocation error", err);
        } else {
          console.log("Response from get current position", res);

          location = { lng: res.coords.longitude, lat: res.coords.latitude };
        }
      });
      console.log("Location from mount", location);
      Meteor.call("address.latlng.streetAddress", location, (err, res) => {
        if (err) {
          alert("There was error check the console");
          console.log(err);
          return;
        }
        console.log("CityState", location, res);
        cityState = res;
        Meteor.call("breweries.byCityState", cityState, (error, response) => {
          if (error) {
            alert("There was error check the console");
            console.log(error);
            return;
          }

          console.log("Breweries recived", response);
          this.setState({
            breweries: response
          });
          this.setState({
            brewery: response[0]
          });
          console.log("breweries updated");
        });
      });
    }
  }
  // componentDidUpdate(prevProps) {
  //   if (!this.compare(this.props.breweries, prevProps.breweries)) {
  //     console.log(
  //       "componenet did update, breweries werent a match",
  //       prevProps.breweries
  //     );
  //     // this.setState({
  //     //   breweries: this.props.breweries
  //     // });
  //   }
  //   // if (!this.compare(this.props.brewery, prevProps.brewery)) {
  //   //   this.setState({ brewery: prevProps.brewery });
  //   // }
  // }
  //
  // compare(arr1, arr2) {
  //   if (!arr1 || !arr2) return false;
  //   if (arr1.length === 0 && arr2.length === 0) {
  //     return true;
  //   }
  //   let result = true;
  //
  //   arr1.forEach(e1 =>
  //     arr2.forEach(e2 => {
  //       if (e1.length > 1 && e2.length) {
  //         result = this.compare(e1, e2);
  //       } else if (e1 !== e2) {
  //         result = false;
  //         return false;
  //       } else {
  //         result = true;
  //       }
  //     })
  //   );
  //
  //   return result;
  // }

  getSuggestions(value) {
    console.log("GETSUGGESTIONS", value);
    Meteor.call("breweries.autocomplete", value, (err, res) => {
      if (err) {
        alert("There was error check the console");
        console.log(err);
        return;
      }

      console.log("getsuggestions", res);
      if (res.length === 0) {
        res = [{ name: "Not Found, try another term" }];
      }
      this.setState({ suggestions: res });
    });
  }

  onChange(event, { newValue }) {
    this.setState({
      value: newValue
    });
  }

  onSuggestionsFetchRequested({ value }) {
    this.debouncedGetSuggestions(value);
    //// TODO:
  }

  // we probably want to not do this, or... clear it but set another variable
  onSuggestionsClearRequested() {
    this.setState({
      suggestions: [{ name: "Not found, try another term" }]
    });
  }

  //suggestion will have id and name
  onSuggestionSelected(_event, { suggestion }) {
    console.log("On suggestion selected", suggestion);
    Meteor.call("breweries.breweryID", suggestion.id, (err, res) => {
      if (err) {
        alert("There was error check the console");
        console.log(err);
        return;
      }
      console.log("suggestion selected", res);
      this.setState({ brewery: res });
      let cityLocation = {
        city: res.brewery.city,
        state: res.brewery.state
      };
      this.getOtherBreweries(cityLocation);
    });

    //so we got a suggestion, now we have the brewry address
  }

  //gets the breweries close to the chosen brewery
  getOtherBreweries(cityLocation) {
    console.log("getOtherBreweries", cityLocation);
    Meteor.call("breweries.byCityState", cityLocation, (err, res) => {
      if (err) {
        alert("There was error check the console");
        console.log(err);
        return;
      }

      console.log("getOtherBreweriesresponse", res);
      this.setState({ breweries: res });
    });
  }

  onBreweryClick(updatedBrewery) {
    console.log("onBreweryClick", updatedBrewery);
    if (this.state.brewery !== updatedBrewery) {
      this.setState({ brewery: updatedBrewery });
      let cityLocation = {
        city: updatedBrewery.brewery.city,
        state: updatedBrewery.brewery.state
      };
      this.getOtherBreweries(cityLocation);
    }
  }
  goToBrewery(id) {
    alert("go to brewery clicked", id);
    console.log("GO to brewery", id);
  }

  render() {
    //console.log("COMPLETESEARCHBARPROPS", this.props);
    const { value } = this.state;

    const inputProps = {
      placeholder: "Type a brewery name or location",
      value,
      onChange: this.onChange,
      id: "searchBar",
      className:
        "shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline mb-4"
    };
    console.log(this.state);
    return (
      <div className="mb-4">
        <div className="position-relative">
          <Autosuggest
            suggestions={this.state.suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            onSuggestionSelected={this.onSuggestionSelected}
          />
        </div>
        <div className="row">
          <div className="col-xl-5 col-md-6">
            {this.state.brewery ? (
              <BreweryCard
                key={this.state.brewery.id}
                id={this.state.brewery.id}
                name={this.state.brewery.brewery.name}
                brewery={this.state.brewery}
                className={"selected-brewery"}
                onClick={e => this.goToBrewery(this.state.brewery.id, e)}
              />
            ) : (
              "loading"
            )}

            <div className="boxsize">
              <BreweriesList
                breweries={this.state.breweries}
                onClick={this.goToBrewery}
                brewery={this.state.brewery}
              />
            </div>
          </div>
          <div className="col-xl-7 col-md-6">
            <BrewMapContainer
              brewery={this.state.brewery}
              breweries={this.state.breweries}
              onMarkerClick={this.onBreweryClick}
              activeMarker={this.state.brewery.id}
            />
          </div>
        </div>
      </div>
    );
  }
}

CompleteSearchBar.propTypes = {
  breweries: PropTypes.arrayOf(PropTypes.object),
  brewery: PropTypes.object
};

export default CompleteSearchBar;
