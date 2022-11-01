import React from "react";
import styled from "styled-components";
import { useAppContext } from "../context/appContext";
import { AiFillCloseCircle } from "react-icons/ai";
import { Logo } from "../components";
import NavLinks from "./NavLinks";
import { ImUser } from "react-icons/im";

const SmallSidebar = () => {
  const { showMenu, toggleMenu, user, logoutUser } = useAppContext();
  return (
    <Wrapper>
      <div
        className={
          showMenu ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button
            className="close-btn"
            onClick={() => {
              toggleMenu();
            }}
          >
            <AiFillCloseCircle size={55} />
          </button>

          <div className="content-header">
            <Logo />
            <h1>Menu</h1>
          </div>
          <NavLinks />
          <div className="logOut">
            <div className="user">
              <ImUser />
              <h4>{user.name}</h4>
            </div>
            <button
              className="logOutBtn"
              onClick={() => {
                logoutUser();
              }}
            >
              LogOut
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  .sidebar-container {
    position: fixed;
    inset: 0;
    background-color: #cac198;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
    opacity: 0;
    transition: 0.15s;
  }
  .show-sidebar {
    z-index: 99;
    opacity: 1;
  }

  .logOut {
    margin-top: 150px;
    text-align: center;
  }
  .logOutBtn {
    background-color: #7f2122;
    border: none;
    color: wheat;
    padding: 5px;
    padding-left: 25px;
    padding-right: 25px;
    border-radius: 8px;
    cursor: pointer;
  }
  .user {
    display: flex;
    align-items: center;
    justify-content: center;
    //   background-color: wheat;
    border-radius: 8px;
    padding-left: 25px;
    padding-right: 25px;
    gap: 15px;
  }
  .content {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 15px;
  }

  .content-header {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .content-header h1 {
    text-decoration: underline;
  }
  .close-btn {
    position: fixed;
    left: 25px;
    top: 25px;
    background: transparent;
    border-color: transparent;
    cursor: pointer;
  }
  .links {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
`;

export default SmallSidebar;
