import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  TOGGLE_MENU,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  LOGOUT_USER,
  HANDLE_CHANGE,
  CLEAR_POST,
  CREATE_POST_BEGIN,
  CREATE_POST_ERROR,
  CREATE_POST_SUCCESS,
  GET_POSTS_BEGIN,
  GET_POSTS_SUCCESS,
  GET_ALL_POSTS_BEGIN,
  GET_ALL_POSTS_SUCCESS,
  SET_EDIT_POST,
  EDIT_POST_BEGIN,
  EDIT_POST_SUCCESS,
  EDIT_POST_ERROR,
  GET_PROFILE_BEGIN,
  GET_PROFILE_ERROR,
  GET_PROFILE_SUCCESS,
  NO_MORE_POSTS,
  LIKE_A_POST,
  MAKE_A_COMMENT,
  LOAD_COMMENTS,
  GET_REPLIES,
} from "./actions";

import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please Provide All The Values",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return { ...state, showAlert: false, alertType: "", alertText: "" };
  }
  if (action.type === REGISTER_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Registration Successful",
      user: action.payload.user,
      token: action.payload.token,
    };
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === LOGIN_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Login Successful",
      user: action.payload.user,
      token: action.payload.token,
    };
  }
  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === TOGGLE_MENU) {
    return { ...state, showMenu: !state.showMenu };
  }
  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Updated Data",
      user: action.payload.user,
      token: action.payload.token,
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === LOGOUT_USER) {
    return { ...initialState, user: null, token: null, location: null };
  }
  if (action.type === HANDLE_CHANGE) {
    return { ...state, [action.payload.name]: action.payload.value };
  }
  if (action.type === CLEAR_POST) {
    return { ...state, title: "", content: "", mood: "neutral" };
  }
  if (action.type === CREATE_POST_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === CREATE_POST_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Post Created!",
    };
  }
  if (action.type === CREATE_POST_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === GET_POSTS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_POSTS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      posts: action.payload.posts.data.posts,
    };
  }
  if (action.type === GET_ALL_POSTS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_ALL_POSTS_SUCCESS) {
    return { ...state, isLoading: false, allPosts: action.payload };
  }
  if (action.type === SET_EDIT_POST) {
    const editPost = state.posts.find((post) => {
      return post._id === action.payload.id;
    });
    const { mood, title, content, _id } = editPost;
    return { ...state, isEditing: true, editPostId: _id, mood, title, content };
  }
  if (action.type === EDIT_POST_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_POST_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Updated Post!",
    };
  }
  if (action.type === EDIT_POST_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === GET_PROFILE_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === GET_PROFILE_SUCCESS) {
    return {
      ...state,
      profileUser: action.payload.profileUser,
      isLoading: false,
    };
  }
  if (action.type === GET_PROFILE_ERROR) {
    return { ...state, isLoading: false };
  }
  if (action.type === NO_MORE_POSTS) {
    return { ...state, noMorePosts: true };
  }
  if (action.type === LIKE_A_POST) {
    const likedPost = action.payload;
    const newPosts = state.allPosts.map((post) => {
      if (post._id === likedPost._id) {
        post.alreadyLiked = likedPost.alreadyLiked;
        post.likedBy = likedPost.likedBy;
        post.likes = likedPost.likes;
      }
      return post;
    });
    return { ...state, allPosts: newPosts };
  }
  if (action.type === MAKE_A_COMMENT) {
    const commentPost = action.payload;
    const newPosts = state.allPosts.map((post) => {
      if (post._id === commentPost._id) {
        post.comments = commentPost.comments.filter((backendcomment) => {
          return backendcomment;
        });
      }
      return post;
    });
    return { ...state, allPosts: newPosts };
  }
  if (action.type === LOAD_COMMENTS) {
    const filteredComments = state.allPosts.map((post) => {
      post.comments = post.comments.filter((comment) => {
        return comment.parentId === null;
      });
      return post;
    });
    return { ...state, allPosts: filteredComments };
  }

  throw new Error(`no such action: ${action.type}`);
};

export default reducer;
