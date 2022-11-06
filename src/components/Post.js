import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAppContext } from "../context/appContext";
import { AiTwotoneLike } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { Comments } from "./index";

const Post = ({
  title,
  content,
  creator,
  mood,
  isMine,
  id,
  creatorId,
  imageUrl,
  likes,
  alreadyLiked,
  comments,
}) => {
  // const [liked, setLiked] = useState(false);
  const { editPost, deletePost, likeAPost } = useAppContext();
  const [showComments, setShowComments] = useState(false);
  function Like() {
    likeAPost(id);
  }
  function toggleComments() {
    setShowComments(!showComments);
    if (showComments) {
      console.log(comments, id, "Show them comments baby");
    }
  }
  return (
    <Wrapper>
      <h3>{title}</h3>
      <p> {content}</p>
      {imageUrl ? (
        <img src={imageUrl} alt="impertorium" className="post-image image" />
      ) : null}
      <h5>{`mood ${mood}`}</h5>
      {isMine ? null : (
        <button
          className={alreadyLiked ? "like-container liked" : "like-container"}
          onClick={() => {
            Like();
          }}
        >
          <AiTwotoneLike
            size={35}
            style={{ color: `${alreadyLiked ? "#0000FF" : "#7F2122"}` }}
          />
          <h3>{likes}</h3>
        </button>
      )}
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
      <button
        className="comment-btn"
        onClick={() => {
          toggleComments();
        }}
      >
        <BiCommentDetail size={25} />
        {comments.length} Comments
      </button>
      {showComments ? <Comments comments={comments} postId={id} /> : null}
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

  .like-container {
    display: flex;
    align-items: center;
    gap: 15px;
    justify-content: left;
    text-align: left;
    background-color: transparent;
    border: none;
    margin-bottom: 10px;
    cursor: pointer;
  }
  .like-container h3 {
    font-size: 1.5rem;
  }
  .liked {
    color: #e5dbb7;
  }
  .liked h3 {
    color: blue;
  }
  .comment-btn {
    margin: 10px;
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    background-color: #d32929;
    padding: 8px;
    border-radius: 8px;
    color: wheat;
    cursor: pointer;
  }
`;

export default Post;
