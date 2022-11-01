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
  LOGOUT_USER,
  HANDLE_CHANGE,
  CLEAR_POST,
  CREATE_POST_BEGIN,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
  GET_POSTS_BEGIN,
  GET_POSTS_SUCCESS,
  GET_ALL_POSTS_BEGIN,
  GET_ALL_POSTS_SUCCESS,
  SET_EDIT_POST,
  EDIT_POST_BEGIN,
  EDIT_POST_SUCCESS,
  EDIT_POST_ERROR,
  GET_PROFILE_ERROR,
  GET_PROFILE_SUCCESS,
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
  isEditing: false,
  editPostId: "",
  title: "",
  content: "",
  moodOptions: ["angry", "great", "sad", "neutral"],
  mood: "neutral",
  posts: [],
  totalPosts: 0,
  allPosts: [],
  profileUser: null,
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
      dispatch({
        type: UPDATE_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  }

  async function createPost() {
    dispatch({ type: CREATE_POST_BEGIN });
    try {
      const { title, content, mood } = state;
      const post = await authFetch.post("/posts/createPost", {
        title,
        content,
        mood,
      });
      console.log(post);
      dispatch({ type: CREATE_POST_SUCCESS });
      clearPost();
    } catch (error) {
      dispatch({
        type: CREATE_POST_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  }

  async function getMyPosts() {
    dispatch({ type: GET_POSTS_BEGIN });
    try {
      const posts = await authFetch.get("/posts/getMyPosts");
      dispatch({ type: GET_POSTS_SUCCESS, payload: { posts } });
    } catch (error) {
      console.log(error.response);
      logoutUser();
    }
  }
  async function getAllPosts() {
    dispatch({ type: GET_ALL_POSTS_BEGIN });
    try {
      const allPosts = await authFetch.get("/posts/getAllPosts");
      dispatch({ type: GET_ALL_POSTS_SUCCESS, payload: allPosts.data });
    } catch (error) {
      console.log(error.response);
      logoutUser();
    }
  }

  async function editPost(id) {
    dispatch({ type: SET_EDIT_POST, payload: { id } });
  }

  async function submitEditPost() {
    dispatch({ type: EDIT_POST_BEGIN });
    try {
      const { title, content, mood } = state;
      const updatedPost = await authFetch.patch(
        `/posts/modifyPost/${state.editPostId}`,
        {
          title,
          content,
          mood,
        }
      );
      dispatch({ type: EDIT_POST_SUCCESS });
    } catch (error) {
      console.log(error.response);
      dispatch({ type: EDIT_POST_ERROR, payload: error.response.data.msg });
    }
    clearAlert();
  }
  async function deletePost(id) {
    try {
      const deletedMessage = await authFetch.delete(`/posts/modifyPost/${id}`);
      getMyPosts();
    } catch (error) {
      logoutUser();
    }
  }

  async function getProfile(id) {
    dispatch({ type: GET_ALL_POSTS_BEGIN });
    try {
      const response = await axios.post("/api/profiles/getProfile", { id });
      const { name, lastName, location } = response.data.user;
      const profileUser = { name, lastName, location };
      dispatch({ type: GET_PROFILE_SUCCESS, payload: { profileUser } });
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_PROFILE_ERROR });
    }
  }
  function clearPost() {
    dispatch({ type: CLEAR_POST });
  }

  function addUserToLocalStorage({ user, token }) {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  }

  function removeUserFromLocalStorage() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  function logoutUser() {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  }
  function toggleMenu() {
    dispatch({ type: TOGGLE_MENU });
  }

  function handleChanges({ name, value }) {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
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
        logoutUser,
        handleChanges,
        createPost,
        getMyPosts,
        getAllPosts,
        editPost,
        deletePost,
        submitEditPost,
        getProfile,
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
