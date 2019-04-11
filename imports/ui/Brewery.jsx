import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import CommentForm from "./CommentForm.jsx";
import CommentList from "./CommentList.jsx";
import { Alert, Jumbotron, Button } from "reactstrap";
import { Breweries } from "../api/breweries.js";

class Brewery extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      liked: false
    };
  }

  onSubmit() {
    Meteor.call(
      "like.update",
      { _id: this.props.brewery[0]._id, email: Meteor.user().emails[0].address },
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
          rating: res.rating,
          id: res.id,
          liked: liked
        });
      }
    );
  }

  renderForm() {
    return Meteor.user() ? (
      <div>
        <CommentForm _id={this.props.brewery[0]._id} />
        <CommentList comments={this.props.brewery[0].comments} />
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
        <CommentList comments={this.props.brewery[0].comments} />
      </div>
    );
  }

  render() {
    console.log("Brewery props: ", this.props);
    console.log("Brewery state: ", this.state);

    return !this.props.loading && this.props.brewery.length > 0 ? (
      <div className="breweryContainer container text-center">
        <div>
          <Jumbotron>
            <h1 className="display-3">{this.props.brewery[0].brewery.name}</h1>
            <p className="lead">
              {this.props.brewery[0].brewery.street +
                ", " +
                this.props.brewery[0].brewery.city +
                ", " +
                this.props.brewery[0].brewery.state}
            </p>
            <hr className="my-2" />
            <p>Blurb</p>
            <p>Likes: {this.props.brewery[0].rating}</p>
            <p className="lead">
              <button
                className="button--primary--outline"
                href={this.props.brewery[0].brewery.website_url}
              >
                Website
              </button>
            </p>
            <p>
              {Meteor.user() ? (
                <Button color="primary button--like" onClick={this.onSubmit}>
                  {this.state.liked ? "Liked" : "Like"}
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
  brewery: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool.isRequired,
  match: PropTypes.object
};

export default withTracker(props => {
  console.log("BREWERY PROPS", props);
  const handle = Meteor.subscribe("Breweries", parseInt(props.match.params.id));
  const loading = !handle.ready();
  let brewery;
  if (!loading) {
    brewery = Breweries.find({}).fetch();
  }
  return {
    user: Meteor.user(),
    loading,
    brewery: brewery,
  };
})(Brewery);
