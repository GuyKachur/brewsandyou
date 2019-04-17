import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";

class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      body: this.props.body,
      owner: this.props.owner,
      createdAt: this.props.createdAt
    };
  }

  render() {
    console.log("Comment props: ", this.props);
    console.log("Comment state: ", this.state);
    return (
      <div className="media mb-2 ml-2 text-left">
        <img
          className="mr-3 rounded"
          width="48"
          height="48"
          src={`https://api.adorable.io/avatars/48/${this.state.owner.toLowerCase()}@adorable.io.png`}
          alt={this.state.owner}
        />

        <div className="media-body shadow-sm rounded bg-white border">
          <div className="d-flex justify-content-between bg-light p-2">
            <h6 className="mt-0 mb-1 text-muted">{this.state.owner}</h6>
            <span className="text-muted">
              {moment(this.state.createdAt).fromNow()}
            </span>
          </div>
          <div className="m-2">{this.state.body}</div>
        </div>
      </div>
    );
  }
}

Comment.propTypes = {
  owner: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.object.isRequired
};

export default Comment;
