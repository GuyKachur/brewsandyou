import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import moment from "moment";
import CommentForm from "./CommentForm.jsx";
import CommentList from "./CommentList.jsx";
import { Alert, Jumbotron, Button } from "reactstrap";
import { Breweries } from "../api/breweries.js";

class Brewery extends Component {
  constructor(props) {
    super(props);

    //getting the brewery data object, ocntaining an id, brewery, comments, rating
    // this.state = {
    //   brewery: {}
    // };
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      liked: false
    };
  }

  onSubmit() {
    // Meteor.call("rating.addSimple", this.state._id, (err, res) => {
    //   if (err) {
    //     alert("There was error check the console");
    //     console.log(err);
    //     return;
    //   }
    //   console.log("adding simple brewery rating");
    //   console.log(res);
    // });
    Meteor.call(
      "like.update",
      { _id: this.state._id, email: Meteor.user().emails[0].address },
      (err, res) => {
        if (err) {
          alert("There was error check the console");
          console.log(err);
          return;
        }
        console.log("added like update");
        console.log(res);
      }
    );
    this.setState({ liked: !this.state.liked });
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
        let liked = false;
        if (
          Meteor.user() &&
          res.usersWhoRated.includes(Meteor.user().emails[0].address)
        ) {
          liked = true;
        }
        this.setState({
          _id: res._id,
          brewery: res.brewery,
          comments: res.comments,
          rating: res.rating,
          id: res.id,
          liked: liked
        });
      }
    );
  }

  componentDidUpdate(prevProps) {
    console.log("componentDidUpdate Brewery: prev then props", prevProps);
    if (this.props && this.props.comments) {
      if (prevProps.comments === undefined) {
        this.setState({ comments: this.props.comments });
        return;
      }
      if (this.props.comments.length !== prevProps.comments.length) {
        this.setState({ comments: this.props.comments });
      }
      if (this.props.rating !== prevProps.rating) {
        this.setState({ rating: this.props.rating });
      }
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
          return false;
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

    return this.state && this.state.brewery ? (
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
            <p>{this.state.rating}</p>
            <p className="lead">
              <button
                className="button--primary--outline"
                href={this.state.brewery.website_url}
              >
                Website
              </button>
            </p>
            <p>
              {Meteor.user() ? (
                <Button color="primary button--like" onClick={this.onSubmit}>
                  {this.state.liked ? "true" : "false"}
                </Button>
              ) : null}
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

export default withTracker(props => {
  console.log("BREWERY PROPS", props);
  const handle = Meteor.subscribe("Breweries", parseInt(props.match.params.id));
  let b = Breweries.find({}).fetch();
  let breweryObject = b.length == 1 ? b[0] : {};
  console.log("BREWERYOBJECT", breweryObject);
  return {
    user: Meteor.user(),
    _id: breweryObject._id,
    brewery: breweryObject.brewery,
    comments: breweryObject.comments,
    rating: breweryObject.rating,
    ready: handle.ready()
  };
})(Brewery);
