import React, { useState } from "react";
import styled from "styled-components";
import { ImReply } from "react-icons/im";
import { CommentForm } from ".";
import { useAppContext } from "../context/appContext";

const Comment = ({ comment, replies }) => {
  const [reply, setReply] = useState(false);
  const [content, setContent] = useState("");
  const { replyToComment } = useAppContext();
  console.log(replies);
  function startReply() {
    setReply(!reply);
  }
  function handleChange(e) {
    setContent(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!content) return;
    sendReply();
  }
  function sendReply() {
    replyToComment(content, comment.postId, comment._id);
  }
  return (
    <Wrapper>
      {comment.parentId ? null : (
        <Wrapper>
          {" "}
          <div className="comment-container">
            {comment.content}
            <div className="buttons">
              <button
                className="reply"
                onClick={() => {
                  startReply();
                }}
              >
                <ImReply size={18} />
              </button>
            </div>
            {reply ? (
              <CommentForm
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            ) : null}
          </div>
          {replies ? (
            <div>
              {replies.map((reply) => {
                return (
                  <div className="replys" key={reply._id}>
                    {reply.content}
                  </div>
                );
              })}
            </div>
          ) : null}{" "}
        </Wrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .comment-container {
    background-color: white;
    border-radius: 5px;
    padding: 10px;
    margin: 5px;
    font-size: 0.9rem;
  }
  .buttons {
    position: relative;
    top: 10px;
    left: 90px;
  }
  .reply {
    background-color: transparent;
    border: none;
  }
  .replys {
    background-color: aliceblue;
    position: relative;
    left: 35px;
    border: 1px solid black;
    margin: 5px;
  }
`;
export default Comment;
