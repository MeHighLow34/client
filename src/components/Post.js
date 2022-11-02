import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAppContext } from "../context/appContext";

const Post = ({
  title,
  content,
  creator,
  mood,
  isMine,
  id,
  creatorId,
  imageUrl,
}) => {
  const { editPost, deletePost } = useAppContext();
  return (
    <Wrapper>
      <h3>{title}</h3>
      <p> {content}</p>
      {imageUrl ? (
        <img src={imageUrl} alt="impertorium" className="post-image image" />
      ) : null}
      <h5>{`mood ${mood}`}</h5>
      {isMine ? null : (
        <Link to={`/profiles/profileInfo/${creatorId}`} className="profileLink">
          Created by: <strong> {creator || "Teodisius"}</strong>
        </Link>
      )}
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
    font-size: 0.8rem;
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
  strong {
    color: #d32929;
  }
  .profileLink {
    text-decoration: none;
    font-size: 0.8rem;
    color: #7f2122;
  }
  @media screen and (min-width: 495px) {
    max-width: 300px;
    text-align: center;
  }
`;

export default Post;
