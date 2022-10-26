import React from "react";
import styled from "styled-components";
import { useAppContext } from "../context/appContext";
import { AiFillCloseCircle } from "react-icons/ai";
import { Logo } from "../components";
import NavLinks from "./NavLinks";

const SmallSidebar = () => {
  const { showMenu, toggleMenu } = useAppContext();
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
  }
  .links {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
`;

export default SmallSidebar;
