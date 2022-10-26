import React from "react";
import { NavLink } from "react-router-dom";
import links from "../utils.js/links";
import { useAppContext } from "../context/appContext";
import styled from "styled-components";

const NavLinks = () => {
  const toggleSidebar = useAppContext();
  return (
    <Wrapper>
      <div className="nav-links">
        {links.map((link) => {
          return (
            <NavLink
              to={link.path}
              key={link.id}
              onClick={toggleSidebar}
              className={({ isActive }) =>
                isActive ? "nav-link is-active" : "nav-link"
              }
            >
              {link.icon} {link.text}
            </NavLink>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  .nav-links {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 50px;
  }
  .nav-link {
    display: flex;
    justify-content: space-around;
    gap: 15px;
    text-decoration: none;
    color: #7f2122;
  }
  .is-active {
    color: #d32929;
  }
`;

export default NavLinks;
