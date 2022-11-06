import React, { useEffect, useState } from "react";
import { Comment, CommentForm, FormRow } from "./index";
import styled from "styled-components";
import { useAppContext } from "../context/appContext";
const Comments = ({ comments, postId }) => {
  const [content, setContent] = useState("");
  const { commentOnAPost, getComments } = useAppContext();
  function handleSubmit(e) {
    e.preventDefault();
    commentOnAPost(content, postId);
  }
  useEffect(() => {
    // getComments();
  }, []);

  function getReplies(id) {
    const replies = comments.filter((comment) => {
      return comment.parentId === id;
    });
    return replies;
  }
  return (
    <Wrapper>
      <form className="comment-form" onSubmit={handleSubmit}>
        <h4>Make a Comment</h4>
        <FormRow
          type="text"
          handleChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <button className="comment-submit-btn" type="submit">
          Post a comment
        </button>
      </form>

      <div className="comment-container">
        {comments.map((comment) => {
          return (
            <Comment
              key={comment._id}
              comment={comment}
              replies={getReplies(comment._id)}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .comment-form {
    border: 1px solid black;
    padding: 10px;
    margin-bottom: 15px;
    background-color: #eeeeee;
    border-radius: 10px;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
  gap: 5px;
  display: flex;
  flex-direction: column;
  h4 {
    color: #7f2122;
  }
  .comment-container {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }
  .cr {
    display: flex;
  }
  .comment-submit-btn {
    background-color: #cac198;
    font-size: 0.75rem;
    border: none;
    padding: 8px;
    border-radius: 10px;
    color: #7f2122;
  }
`;
export default Comments;
