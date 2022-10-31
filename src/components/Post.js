import React from "react";
import styled from "styled-components";

const Post = ({ title, content, creator, mood, isMine }) => {
  return (
    <Wrapper>
      <h3>{title}</h3>
      <p> {content}</p>
      <h5>{`mood ${mood}`}</h5>
      <h6>Created by: {creator || "Teodisius"}</h6>
      {isMine ? (
        <footer>
          <button className="btn success">edit</button>
          <button className="btn">delete</button>
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
  }
`;

export default Post;
