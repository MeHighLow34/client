import React from "react";
import { Logo } from "../components/index.js";
import styled from "styled-components";
import mainPic from "../assets/images/main.jpg";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <header>
        <Logo />
        <h1>IMPERATORIUM</h1>
      </header>
      <div className="center">
        <h1>Welcome to Social Network...for Emperors</h1>
        <Link to="/authentication" className="btn">
          LogIn / Register
        </Link>
      </div>

      <footer>
        <h4>Copyright 400BC - 2022AD</h4>
      </footer>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  header {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    padding-left: 15px;
    padding-right: 15px;
    //border-bottom: 1px solid black;
    background-color: #7f2122;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    width: 100%;
  }

  .center {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 80%;
    padding: 20px;
    text-align: center;
  }
  h1 {
    color: #facd1e;
    font-weight: 900;
    text-shadow: 0.055em 0 black, 0 0.055em black, -0.055em 0 black,
      0 -0.055em black;
  }

  footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2.5rem;
    background-color: #2b2d42;
    color: wheat;
    text-align: center;
    display: grid;
  }

  height: 100vh;
  background-image: url(${mainPic});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  body {
  }

  @media only screen and (max-width: 600px) {
    header.h1 {
      font-size: 1rem;
    }
  }
`;

export default Landing;
