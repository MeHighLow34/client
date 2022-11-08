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
  NO_MORE_POSTS,
  LIKE_A_POST,
  MAKE_A_COMMENT,
  LOAD_COMMENTS,
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
  image: null,
  moodOptions: ["angry", "great", "sad", "neutral"],
  mood: "neutral",
  posts: [],
  totalPosts: 0,
  allPosts: [],
  noMorePosts: false,
  profileUser: null,
};
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = axios.create({
    baseURL: "https://imperatorium.adaptable.app/api",
    headers: {
      withCredentials: true,
      Authorization: `Bearer ${state.token}`,
    },
  });
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
      const response = await axios.post("/api/api/auth/register", currentUser);
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
      const response = await axios.post(
        "https://imperatorium.adaptable.app/api/auth/login",
        currentUser
      );
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
        payload: { msg: error.response.data.msg, token: state.token },
      });
    }
    clearAlert();
  }

  async function createPost(image) {
    dispatch({ type: CREATE_POST_BEGIN });
    try {
      const { title, content, mood } = state;
      let imageUrl = "";
      if (image) {
        try {
          const formData = new FormData();
          formData.append("file", image);
          formData.append("upload_preset", "Zr4u7x!A");
          const dataRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dtgdu6x8j/image/upload",
            formData
          );
          imageUrl = dataRes.data.url;
        } catch (error) {
          console.log(error);
        }
      }
      const post = await authFetch.post("/posts/createPost", {
        title,
        content,
        mood,
        imageUrl,
      });
      console.log(post);
      dispatch({ type: CREATE_POST_SUCCESS });
      clearPost();
    } catch (error) {
      //  console.log(error);
      dispatch({
        type: CREATE_POST_ERROR,
        payload: { msg: error.response.data.msg },
      });
      console.log(error.response);
    }
    clearAlert();
  }

  async function likeAPost(id) {
    try {
      const response = await authFetch.patch("/posts/likeAPost", {
        id,
      });
      const { post } = response.data;
      if (post) {
        dispatch({ type: LIKE_A_POST, payload: post });
      }
    } catch (error) {
      console.log(error);
    }
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
  async function getAllPosts(skip) {
    dispatch({ type: GET_ALL_POSTS_BEGIN });
    try {
      const allPosts = await authFetch.get(`/posts/getAllPosts?skip=${skip}`);
      // const allPosts = await axios({
      //   method: "post",
      //   url: `https://imperatorium.adaptable.app/api/posts/getAllPosts?skip=0`,
      //   headers: {
      //     "Content-Type": "application/json",
      //     "X-API-KEY": "XXX",
      //     Authorization: `Bearer ${state.token}`,
      //   },
      // });
      const newPosts = allPosts.data.all;
      let allPostData;
      if (state.allPosts.length != 0) {
        let oldPosts = state.allPosts;
        if (newPosts.length === 0) {
          dispatch({ type: NO_MORE_POSTS });
        }
        allPostData = oldPosts.concat(newPosts);
      } else {
        allPostData = newPosts;
      }

      dispatch({ type: GET_ALL_POSTS_SUCCESS, payload: allPostData });
    } catch (error) {
      console.log(error);
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
      const response = await authFetch.post("/profiles/getProfile", { id });
      const { name, lastName, location } = response.data.user;
      const profileUser = { name, lastName, location };
      dispatch({ type: GET_PROFILE_SUCCESS, payload: { profileUser } });
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_PROFILE_ERROR });
    }
  }

  async function commentOnAPost(content, postId) {
    const response = await authFetch.patch("/posts/comment", {
      content,
      postId,
    });
    const { post } = response.data;
    dispatch({ type: MAKE_A_COMMENT, payload: post });
  }
  async function replyToComment(content, postId, parentId) {
    const response = await authFetch.patch("/posts/comment", {
      content,
      postId,
      parentId,
    });
    const { post } = response.data;
    dispatch({ type: MAKE_A_COMMENT, payload: post });
  }
  function getComments() {
    dispatch({ type: LOAD_COMMENTS });
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
        likeAPost,
        commentOnAPost,
        replyToComment,
        getComments,
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
