import React from "react";
import { Outlet, Link, Navigate } from "react-router-dom";
import styled from "styled-components";
import { Logo, SmallSidebar } from "../../components";
import { MdMenu } from "react-icons/md";
import { useAppContext } from "../../context/appContext";

const SharedLayout = () => {
  const { toggleMenu } = useAppContext();
  return (
    <Wrapper>
      <header className="dashboard-header">
        <Logo />
        <h1>IMPERATORIUM</h1>
        <button
          className="toggle-btn"
          onClick={() => {
            toggleMenu();
          }}
        >
          <MdMenu className="hamburger-stack" size={55} />
        </button>
      </header>
      <main>
        <SmallSidebar />
        <Outlet />
      </main>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  background-color: #fff5e6;
  height: 100vh;
  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: #7f2122;
    position: static;
  }
  .toggle-btn {
    background: transparent;
    border-color: transparent;
    color: #facd1e;
  }
  @media screen and (max-width: 495px) {
    .dashboard-header h1 {
      display: none;
    }
  }
  .hamburger-stack {
    font-size: 45px;
  }
`;
export default SharedLayout;
