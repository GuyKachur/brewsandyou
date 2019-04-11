import React, { Component } from "react";
import Comment from "./Comment.jsx";
import PropTypes from "prop-types";

class CommentList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("COMMENTLISTPROPS", this.props);
    return (
      <div className="commentList text-left">
        <h5 className="text-muted mb-3">
          <span className="badge ml-2">
            {this.props.comments.length}
          </span>{" "}
          Comment{this.props.comments.length > 0 ? "s" : ""}
        </h5>

        {this.props.comments.length === 0 ? (
          <div className="alert text-center alert--secondary m-2">
            Be the first to comment
          </div>
        ) : null}

        {this.props.comments.map((comment, index) => (
          <Comment key={index} body={comment.body} owner={comment.owner} createdAt={comment.createdAt} />
        ))}
      </div>
    );
  }
}
CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default CommentList;
