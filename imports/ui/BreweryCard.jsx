import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";

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
    let border =
      this.props.className === "selected-brewery"
        ? "0px 0px 10px 2px rgba(239,108,71,1)"
        : "white";
    return (
      <div>
        <Card
          onClick={e => this.props.onClick(this.props.brewery, e)}
          style={{ boxShadow: border, paddingBottom: "5px" }}
        >
          <CardBody>
            {this.props.className === "selected-brewery" ? (
              <img
                src="beers-clinking.svg"
                width="40px"
                height="40px"
                alt="our-logo"
                style={{ marginRight: 0.3 + "em" }}
              />
            ) : (
              ""
            )}
            <CardTitle>{this.props.name}</CardTitle>
            <CardSubtitle>{address}</CardSubtitle>
            {this.props.brewery.id === -1 ? (
              ""
            ) : (
              <NavLink className="lnk-primary" to={"brewery/" + this.props.id}>
                More Info
              </NavLink>
            )}
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
