import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import errorPic from "../assets/images/error.jpg";

const Error = () => {
  return (
    <Wrapper>
      <h1>CDIV</h1>
      <h3>The Page You Are Looking For Does Not Exist...Barbare</h3>
      <Link to="/landing" className="barbat">
        Back To Home
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .barbat {
    text-decoration: none;
    color: white;
    background-color: red;
    padding: 15px;
    border-radius: 10px;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  background-color: white;
  h1 {
    color: red;
    font-size: 5rem;
  }
  h3 {
    text-shadow: 0.035em 0 black, 0 0.035em black, -0.035em 0 black,
      0 -0.035em black;
    color: #facd1e;
  }
  color: white;
  color: white;
  font-size: 40px;

  font-size: 2rem;
  background-image: url(${errorPic});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export default Error;
