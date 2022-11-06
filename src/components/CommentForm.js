import React from "react";
import { FormRow } from "./index";

const CommentForm = ({ handleSubmit, handleChange }) => {
  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <h4>Make a Comment</h4>
      <FormRow type="text" handleChange={handleChange} />
      <button className="comment-submit-btn" type="submit">
        Post a comment
      </button>
    </form>
  );
};

export default CommentForm;
