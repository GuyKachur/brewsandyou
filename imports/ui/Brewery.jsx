import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import Comment from "./Comment.jsx";
import PropTypes from "prop-types";
import moment from "moment";
import CommentForm from "./CommentForm.jsx";
import CommentList from "./CommentList.jsx";
import {
  Alert,
  Card,
  CardImg,
  Jumbotron,
  Button,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";
import { Breweries } from "../api/breweries.js";

class Brewery extends Component {
  constructor(props) {
    super(props);

    //getting the brewery data object, ocntaining an id, brewery, comments, rating
    // this.state = {
    //   _id: props._id,
    //   brewery: props.brewery,
    //   comments: props.comments,
    //   rating: props.rating
    // };
  }

  componentDidMount() {
    Meteor.call(
      "breweries.breweryID",
      this.props.match.params.id,
      (err, res) => {
        if (err) {
          alert("There was error check the console");
          console.log(err);
          return;
        }
        console.log("brewery profile loaded", res);
        this.setState({
          _id: res._id,
          brewery: res.brewery,
          comments: res.comments,
          rating: res.rating,
          id: res.id
        });
      }
    );
  }

  componentDidUpdate(prevProps) {
    // console.log("componentDidUpdate Brewery: prev then props", prevProps);
    // if (!this.compare(this.props.comments, prevProps.comments)) {
    //   this.setState({
    //     comments: this.props.comments
    //   });
    // }
    // if (!this.compare(this.props.rating, prevProps.rating)) {
    //   this.setState({
    //     rating: this.props.rating
    //   });
    // }
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

  renderForm() {
    return Meteor.user() ? (
      <div>
        <CommentForm _id={this.state._id} />
        <CommentList comments={this.state.comments} />
      </div>
    ) : (
      <div className="plzLogin text-center">
        <Alert color="light">
          Please{" "}
          <NavLink
            className="lnk-secondary"
            to={{ pathname: "/login", state: { prevPath: location.pathname } }}
          >
            login
          </NavLink>{" "}
          to comment.
        </Alert>
        <CommentList comments={this.state.comments} />
      </div>
    );
  }

  render() {
    console.log("moment: ", moment());
    console.log("props: ", this.props);
    console.log("state: ", this.state);

    return this.state ? (
      <div className="breweryContainer container text-center">
        <div>
          <Jumbotron>
            <h1 className="display-3">{this.state.brewery.name}</h1>
            <p className="lead">
              {this.state.brewery.street +
                ", " +
                this.state.brewery.city +
                ", " +
                this.state.brewery.state}
            </p>
            <hr className="my-2" />
            <p>Blurb</p>
            <p className="lead">
              <button className="button--primary--outline" href={this.state.brewery.website_url}>
                Website
              </button>
            </p>
          </Jumbotron>
        </div>
        <div className="commentList text-left">{this.renderForm()}</div>
      </div>
    ) : (
      <div> Loading ... </div>
    );
  }
}
Brewery.propTypes = {
  _id: PropTypes.number.isRequired,
  brewery: PropTypes.object.isRequired,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  rating: PropTypes.number.isRequired,
  match: PropTypes.object
};

export default withTracker(() => {
  const handle = Meteor.subscribe("Breweries");
  return {
    user: Meteor.user(),
    brewery: Breweries.find({}).fetch(),
    ready: handle.ready()
  };
})(Brewery);
