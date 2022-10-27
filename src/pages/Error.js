import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import errorPic from "../assets/images/error.jpg";

const Error = () => {
  return (
    <Wrapper>
      <h1>CDIV</h1>
      <h3>Page you are looking for doesn't exist</h3>
      <Link to="/landing" className="barbat">
        Back To Rome
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .barbat {
    text-decoration: none;
    color: white;
    background-color: #7f2122;
    padding: 15px;
    border-radius: 10px;
  }
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  background-color: white;
  h1 {
    color: #7f2122;
    font-size: 5rem;
  }
  h3 {
    text-shadow: 0.035em 0 black, 0 0.035em black, -0.035em 0 black,
      0 -0.035em black;
    color: #cac198;
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
