import React, { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../components";
import styled from "styled-components";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const AuthenticatePage = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const { showAlert, displayAlert, isLoading, registerUser, user, loginUser } =
    useAppContext();

  useEffect(() => {
    setTimeout(() => {
      if (user) {
        navigate("/");
      }
    }, 1000);
  }, [user, navigate]);
  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  function HandleSubmit(e) {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }

    const currentUser = { name, email, password };
    if (isMember) {
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }
  }

  function toggleMember() {
    setValues({ ...values, isMember: !values.isMember });
  }
  return (
    <Wrapper>
      <form className="form" onSubmit={HandleSubmit}>
        <Logo />
        {showAlert ? <Alert /> : null}
        {values.isMember ? null : (
          <FormRow
            name="name"
            value={values.name}
            type="text"
            handleChange={handleChange}
          />
        )}
        <FormRow
          name="email"
          value={values.email}
          type="email"
          handleChange={handleChange}
        />
        <FormRow
          name="password"
          value={values.password}
          type="password"
          handleChange={handleChange}
        />
        <button className="btn">Submit</button>
        <h6>
          {values.isMember
            ? "Not a member?...Register"
            : "Already a member...Log In"}
        </h6>
        <button
          type="button"
          className="specBTN"
          onClick={() => {
            toggleMember();
          }}
          disabled={isLoading}
        >
          {values.isMember ? "Register" : "Log In"}
        </button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: wheat;
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 10px;
    box-shadow: 0 0.4px 0.4px rgba(128, 128, 128, 0.109),
      0 1px 1px rgba(128, 128, 128, 0.155),
      0 2.1px 2.1px rgba(128, 128, 128, 0.195),
      0 4.4px 4.4px rgba(128, 128, 128, 0.241),
      0 12px 12px rgba(128, 128, 128, 0.35);
    padding: 50px;
    gap: 1rem;
  }

  .specBTN {
    font-size: 0.75rem;
    background-color: white;
    border: none;
    padding: 5px;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    cursor: pointer;
  }
`;
export default AuthenticatePage;
