import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
const Logo = () => {
  const navigate = useNavigate();
  return (
    <img
      src={logo}
      alt="imperatorium-logo"
      className="logo"
      onClick={() => {
        navigate("/");
      }}
    />
  );
};

export default Logo;
