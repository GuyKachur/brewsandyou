import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { NavLink } from "react-router-dom";

class BreweryCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let address =
      this.props.brewery.brewery.street +
      ", " +
      this.props.brewery.brewery.city +
      ", " +
      this.props.brewery.brewery.state;
    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle>{this.props.name}</CardTitle>
            <CardSubtitle>{address}</CardSubtitle>
            <NavLink className="lnk-primary" to={"brewery/" + this.props.id}>More Info</NavLink>
          </CardBody>
        </Card>
      </div>
    );
  }
}

BreweryCard.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  brewery: PropTypes.object.isRequired,
  onClick: PropTypes.func
};

export default BreweryCard;
