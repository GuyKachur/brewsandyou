import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import Comment from "./Comment.jsx";
import PropTypes from "prop-types";
import moment from "moment";
import CommentForm from "./CommentForm";
import {
  Alert,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";

class Brewery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createdAt: "Mon Apr 08 2019 14:17:18 GMT-0700 (Pacific Daylight Time)",
      brewery: {
        id: 456,
        name: "Camino Brewing Co LLC",
        brewery_type: "micro",
        street: "718 S 1st St",
        city: "San Jose",
        state: "California",
        postal_code: "95113",
        country: "United States",
        longitude: "-121.882347823612",
        latitude: "37.3253017839889",
        phone: "",
        website_url: "http://www.caminobrewing.com",
        updated_at: "2018-08-23T23:26:25.248Z",
        tag_list: []
      },
      id: 456,
      comments: [
        {
          owner: "asdf@asdf.com",
          body: "I love React!",
          createdAt: "Mon Apr 08 2019 14:17:18 GMT-0700 (Pacific Daylight Time)"
        },
        {
          owner: "asdf@asdf.com",
          body: "It is super fun!",
          createdAt: "Mon Apr 08 2019 14:16:09 GMT-0700 (Pacific Daylight Time)"
        },
        {
          owner: "guy@guy.com",
          body: "I hate you!",
          createdAt: "Mon Apr 08 2019 14:15:09 GMT-0700 (Pacific Daylight Time)"
        },
        {
          owner: "jimmy@jimmy.com",
          body: "I love trees!",
          createdAt: "Mon Apr 08 2019 13:55:01 GMT-0700 (Pacific Daylight Time)"
        }
      ],
      rating: 0
    };
  }

  // componentDidUpdate(prevProps) {
  //   if (!this.compare(this.props.comments, prevProps.comments)) {
  //     this.setState({
  //       comments: this.props.comments
  //     });
  //   }
  // }

  // compare(arr1, arr2) {
  //   if (!arr1 || !arr2) return;
  //   // if (arr1.length === 0 && arr2.length === 0) {
  //   //   return true;
  //   // }
  //   let result = true;

  //   arr1.forEach(e1 =>
  //     arr2.forEach(e2 => {
  //       if (e1.length > 1 && e2.length) {
  //         result = this.compare(e1, e2);
  //       } else if (e1 !== e2) {
  //         result = false;
  //       } else {
  //         result = true;
  //       }
  //     })
  //   );

  //   return result;
  // }

  renderForm() {
    return Meteor.user() ? (
      <CommentForm />
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
      </div>
    );
  }

  render() {
    console.log("moment: ", moment());
    console.log("props: ", this.props);
    console.log("state: ", this.state);
    let address =
      this.state.brewery.street +
      ", " +
      this.state.brewery.city +
      ", " +
      this.state.brewery.state;
    return (
      <div className="breweryContainer container">
        <h1>{this.props.match.params.id}</h1>

        <div>
          <Card>
            <CardBody>
              <CardTitle>{this.state.brewery.name}</CardTitle>
              <CardSubtitle>{address}</CardSubtitle>
            </CardBody>
          </Card>
        </div>
        <div className="commentList text-left">
          {this.renderForm()}
          <h5 className="text-muted mb-3">
            <span className="badge badge-success ml-2">
              {this.state.comments.length}
            </span>{" "}
            Comment{this.state.comments.length > 0 ? "s" : ""}
          </h5>

          {this.state.comments.length === 0 ? (
            <div className="alert text-center alert-info m-2">
              Be the first to comment
            </div>
          ) : null}

          {this.state.comments.map((comment, index) => (
            <Comment
              key={index}
              body={comment.body}
              owner={comment.owner}
              createdAt={comment.createdAt}
            />
          ))}
        </div>
      </div>
    );
  }
}
Brewery.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object)
};

export default withTracker(() => {
  return {
    user: Meteor.user()
  };
})(Brewery);
// export default Brewery;
