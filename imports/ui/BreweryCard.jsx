import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardLink
} from "reactstrap";

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
          <CardImg top width="100%" src="" alt="Card image cap" />
          <CardBody>
            <CardTitle>{this.props.name}</CardTitle>
            <CardSubtitle>{address}</CardSubtitle>
            <CardLink href={"brewery/" + this.props.id}>More Info</CardLink>
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
