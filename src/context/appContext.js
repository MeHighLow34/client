import React, { useState, useReducer, useContext } from "react";
import reducer from "./reducer";
import axios from "axios";

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  TOGGLE_MENU,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
} from "./actions";
import { Action } from "@remix-run/router";

const AppContext = React.createContext();

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "Provide All Values!!!",
  alertType: "danger",
  user: JSON.parse(user) || null,
  token: token || null,
  showMenu: false,
};
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = axios.create({
    baseURL: "/api",
    headers: {
      Authorization: `Bearer ${state.token}`,
    },
  });

  // authFetch.interceptors.request.use(
  //   (config) => {
  //     config.headers.common["Authorization"] = `Bearer ${state.token}`;
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );
  // // response interceptor
  // authFetch.interceptors.response.use(
  //   (response) => {
  //     return response;
  //   },
  //   (error) => {
  //     console.log(error.response);
  //     if (error.response.status === 401) {
  //       console.log("AUTH ERROR");
  //     }
  //     return Promise.reject(error);
  //   }
  // );

  function displayAlert() {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  }
  function clearAlert() {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  }

  async function registerUser(currentUser) {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post("/api/auth/register", currentUser);
      const { user, token } = response.data;
      dispatch({ type: REGISTER_USER_SUCCESS, payload: { user, token } });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  }

  async function loginUser(currentUser) {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const response = await axios.post("/api/auth/login", currentUser);
      const { user, token } = response.data;
      dispatch({ type: LOGIN_USER_SUCCESS, payload: { user, token } });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  }

  async function updateUser(currentUser) {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const response = await authFetch.patch("/auth/updateUser", currentUser);
      console.log(response);
      const { user, token } = response.data;
      dispatch({ type: UPDATE_USER_SUCCESS, payload: { user, token } });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      console.log(error);
    }
  }

  function addUserToLocalStorage({ user, token }) {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  }

  function removeUserFromLocalStorage() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  function toggleMenu() {
    dispatch({ type: TOGGLE_MENU });
  }
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        toggleMenu,
        updateUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
