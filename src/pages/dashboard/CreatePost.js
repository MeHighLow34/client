import React, { useState } from "react";
import styled from "styled-components";
import { Logo, FormRow, Alert, FormRowSelect } from "../../components";
import { useAppContext } from "../../context/appContext";
import { ImFolderUpload } from "react-icons/im";

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
    isEditing,
    submitEditPost,
  } = useAppContext();

  const [image, setImage] = useState();
  // this.inputButton = React.createRef();
  //  this.inputText = React.createRef();

  function handleSubmit(e) {
    e.preventDefault();
    if (!title || !content) {
      displayAlert();
      return;
    }
    if (isEditing) {
      submitEditPost();
      return;
    }
    createPost(image);
  }
  function handleChange(e) {
    handleChanges({ name: e.target.name, value: e.target.value });
  }

  const hiddenFileInput = React.useRef(null);
  const customText = React.useRef(null);
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h2>{isEditing ? "Edit a Post" : "Create a Post"}</h2>
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
        {isEditing ? null : (
          <div className="upload-c">
            <input
              type="file"
              hidden="hidden"
              ref={hiddenFileInput}
              accept="image/*"
              onChange={(e) => {
                if (hiddenFileInput.current.value) {
                  customText.current.innerText =
                    hiddenFileInput.current.value.slice(12);
                  console.log(hiddenFileInput.current.value);
                } else {
                  customText.current.innerHTML = "No file chosen, yet.";
                }
                setImage(e.target.files[0]);
                console.log(e.target.files[0]);
              }}
            />
            <button
              type="button"
              className="btn upload"
              onClick={() => {
                hiddenFileInput.current.click();
              }}
            >
              <ImFolderUpload />
            </button>
            <span ref={customText}>No image uploaded, yet...</span>
          </div>
        )}
        <button className="btn post" type="submit" disabled={isLoading}>
          {isEditing ? "Edit" : "Post"}
        </button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .form {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }
  .textArea {
    height: 100px;
  }
  .upload {
    width: 50px;
    text-align: center;
    margin-bottom: 10px;
    background-color: #ffcc33;
  }
  .post {
    width: 150px;
  }
  .upload-c {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  span {
    font-size: 0.9rem;
    color: #7f2122;
  }

  // display: flex;
  // flex-direction: column;
`;

export default CreatePost;
