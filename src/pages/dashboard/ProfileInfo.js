import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Logo, FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";

const ProfileInfo = () => {
  const {
    user,
    updateUser,
    displayAlert,
    showAlert,
    isLoading,
    getProfile,
    profileUser,
  } = useAppContext();

  const { id } = useParams();

  useEffect(() => {
    getProfile(id);
  }, []);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <Wrapper>
      <div className="container">
        <h1 className="info-header">
          {profileUser ? profileUser.name : "Loading..."} Profile
        </h1>

        <h3 className="label">Name:</h3>
        <h1 className="info">
          {profileUser ? profileUser.name + " " : "Loading..."}
          {profileUser ? profileUser.lastName : "Loading..."}
        </h1>
        <h3 className="label">Location: </h3>
        <h1 className="info">
          {profileUser ? profileUser.location : "Loading..."}
        </h1>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .info-header {
    text-decoration: underline;
    color: #d32929;
  }
  .container {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    // background-color: #e5dbb7;
    padding: 20px;
    border-radius: 10px;
    margin-top: 100px;
    margin-left: 5px;
    margin-right: 5px;
    //  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
  .label {
    font-size: 1rem;
    color: #7f2122;
  }
  .info {
    font-size: 1.5rem;
    background-color: #e5dbb7;
    padding: 6.5px;
    border-radius: 10px;
  }
`;

export default ProfileInfo;
