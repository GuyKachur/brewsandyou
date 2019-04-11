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
    return (
      <div className="media mb-2 ml-2 text-left">
        <img
          className="mr-3 rounded"
          width="48"
          height="48"
          src={`https://robohash.org/${this.state.owner.toLowerCase()}`}
          alt={this.state.owner}
        />

        <div className="media-body p-2 shadow-sm rounded bg-light border">
          <div>
            <h6 className="mt-0 mb-1 text-muted">{this.state.owner}</h6>
            <span>{moment(this.state.createdAt).fromNow()}</span>
          </div>
          <div>{this.state.body}</div>
        </div>
      </div>
    );
  }
}

Comment.propTypes = {
  owner: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired
};

export default Comment;
