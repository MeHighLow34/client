import React from "react";
import styled from "styled-components";
import { Logo, FormRow, Alert, FormRowSelect } from "../../components";
import { useAppContext } from "../../context/appContext";

const CreatePost = () => {
  const {
    title,
    content,
    moodOptions,
    mood,
    displayAlert,
    showAlert,
    handleChanges,
    createPost,
    isLoading,
  } = useAppContext();
  function handleSubmit(e) {
    e.preventDefault();
    if (!title || !content) {
      displayAlert();
    }
    createPost();
  }
  function handleChange(e) {
    handleChanges({ name: e.target.name, value: e.target.value });
  }
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h2>Create a Post</h2>
        {showAlert ? <Alert /> : null}
        <FormRow
          type="text"
          name="title"
          handleChange={handleChange}
          value={title}
        />
        Content
        <textarea
          className="form-input form-textarea"
          name="content"
          value={content}
          onChange={(e) => {
            handleChange(e);
          }}
        ></textarea>
        <FormRowSelect
          labelText="Mood"
          name="mood"
          value={mood}
          list={moodOptions}
          handleChange={handleChange}
        />
        <button className="btn" type="submit" disabled={isLoading}>
          Post
        </button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .form {
    text-align: center;
  }
  .textArea {
    height: 100px;
  }
`;

export default CreatePost;
