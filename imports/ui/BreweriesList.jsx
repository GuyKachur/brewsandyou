import React, { Component } from "react";
import PropTypes from "prop-types";
import BreweryCard from "./BreweryCard";

/**
 * Class renders a list of breweries
 * @extends Component
 */
class BreweriesList extends Component {
  constructor(props) {
    super(props);
    // this.onClick = this.onClick.bind(this);
  }

  /** reloads heh list */
  componentDidUpdate(prevProps) {
    if (!this.compare(this.props.breweries, prevProps.breweries)) {
      //if the breweries change to a different set, update, otherwise do nothing
      this.setState({
        breweries: this.props.breweries
      });
    }
  }

  /** compares two arrays for ineqaulity,  */
  compare(arr1, arr2) {
    if (!arr1 || !arr2) return;
    // if (arr1.length === 0 && arr2.length === 0) {
    //   return true;
    // }
    let result = true;

    arr1.forEach(e1 =>
      arr2.forEach(e2 => {
        if (e1.length > 1 && e2.length) {
          result = this.compare(e1, e2);
        } else if (e1 !== e2) {
          return false;
        } else {
          result = true;
        }
      })
    );

    return result;
  }

  //
  // onClick() {
  //   alert("breweriesList OnClick");
  // }

  //renders a list of breweries
  render() {
    //console.log("LISTPROPS", this.props);
    const breweryCards = this.props.breweries.map(brewery => {
      //console.log("BREWERY IN BREWERY CARD" + brewery);
      if (brewery.id === this.props.brewery.id) {
        return;
      }
      let breweryCard = (
        <BreweryCard
          key={brewery.id}
          id={brewery.id}
          name={brewery.brewery.name}
          brewery={brewery}
          onClick={this.props.onClick}
          userLocation={this.props.userLocation}
        />
      );
      return breweryCard;
    });
    return <div>{breweryCards} </div>;
  }
}

BreweriesList.propTypes = {
  breweries: PropTypes.arrayOf(PropTypes.object).isRequired,
  brewery: PropTypes.object.isRequired,
  onClick: PropTypes.func
};

export default BreweriesList;
