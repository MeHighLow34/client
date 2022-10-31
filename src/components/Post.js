import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAppContext } from "../context/appContext";

const Post = ({ title, content, creator, mood, isMine, id }) => {
  const { editPost, deletePost } = useAppContext();
  return (
    <Wrapper>
      <h3>{title}</h3>
      <p> {content}</p>
      <h5>{`mood ${mood}`}</h5>
      <h6>Created by: {creator || "Teodisius"}</h6>
      {isMine ? (
        <footer>
          <Link
            to="/createPost"
            className="btn success"
            onClick={() => {
              editPost(id);
            }}
          >
            Edit
          </Link>

          <button
            className="btn"
            onClick={() => {
              deletePost(id);
            }}
          >
            delete
          </button>
        </footer>
      ) : null}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;
  padding: 15px;
  margin: 8px;
  background-color: #e5dbb7;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  h3 {
    color: #7f2122;
  }
  p {
    color: black;
  }

  h6 {
    color: #cac198;
  }
  button {
    font-size: 0.65rem;
  }
  footer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }
  .success {
    background-color: green;
    text-decoration: none;
    font-size: 0.65rem;
  }
`;

export default Post;
