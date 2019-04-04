import React, { Component } from "react";
import PropTypes from "prop-types";
import BreweryCard from "./BreweryCard";

class BreweriesList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    if (!this.compare(this.props.breweries, prevProps.breweries)) {
      this.setState({
        breweries: this.props.breweries
      });
    }
  }

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
          result = false;
        } else {
          result = true;
        }
      })
    );

    return result;
  }

  render() {
    console.log("FLATTEND ARRAY " + this.props.breweries.flat());
    const breweryCards = this.props.breweries.flat().map(brewery => {
      console.log("BREWERY IN BREWERY CARD" + brewery);
      let breweryCard = (
        <BreweryCard
          key={brewery.id}
          id={brewery.id}
          name={brewery.brewery.name}
          brewery={brewery}
          onClick={() => this.props.onClick(brewery)}
        />
      );
      return breweryCard;
    });
    return <div> {breweryCards} </div>;
  }
}

BreweriesList.propTypes = {
  breweries: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
  onClick: PropTypes.func
};

export default BreweriesList;
