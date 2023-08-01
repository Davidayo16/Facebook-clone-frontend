import axios from "axios";
import {
  DELETE_POST_FAIL,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  ONE_POST_FAIL,
  ONE_POST_REQUEST,
  ONE_POST_SUCCESS,
  POST_CREATE_REVIEW_FAIL,
  POST_CREATE_REVIEW_REQUEST,
  POST_CREATE_REVIEW_SUCCESS,
  SINGLE_POST_FAIL,
  SINGLE_POST_REQUEST,
  SINGLE_POST_SUCCESS,
  TIMELINE_POST_FAIL,
  TIMELINE_POST_REQUEST,
  TIMELINE_POST_SUCCESS,
} from "../Constants/PostConstants";
import {
  LIKE_POST_FAIL,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
} from "../Constants/PostConstants";
import { logout } from "./UserAction";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Replace with your environment variable name
});
export const getPosts = () => async (dispatch, getState) => {
  let url = "/api/post/timeline";

  try {
    dispatch({ type: TIMELINE_POST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    console.log(userInfo.token);
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await api.get(url, config);

    dispatch({ type: TIMELINE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TIMELINE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserPost = (id) => async (dispatch, getState) => {
  let url = `/api/post/${id}`;

  try {
    dispatch({ type: SINGLE_POST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    console.log(userInfo.token);
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await api.get(url, config);
    console.log(data);
    dispatch({ type: SINGLE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SINGLE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOnePost = (id) => async (dispatch, getState) => {
  let url = `/api/post/${id}/single`;

  try {
    dispatch({ type: ONE_POST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    console.log(userInfo.token);
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await api.get(url, config);
    console.log(data);
    dispatch({ type: ONE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ONE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const likeAndUnlikePost = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: LIKE_POST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await api.post(`/api/post/${id}/like`, {}, config);
    console.log(data);
    dispatch({ type: LIKE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LIKE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createPostReview = (id, review) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_CREATE_REVIEW_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await api.post(`/api/post/${id}/review`, review, config);
    console.log(data);
    dispatch({ type: POST_CREATE_REVIEW_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not Authorized, token failed") {
      dispatch(logout());
    }
    if (message === "Not Authorized, no token") {
      dispatch(logout());
    }
    dispatch({
      type: POST_CREATE_REVIEW_FAIL,
      payload: message,
    });
  }
};

export const deletePost = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_POST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await api.delete(`/api/post/${id}`, config);
    console.log(data);

    dispatch({ type: DELETE_POST_SUCCESS });
    // dispatch({ type: SINGLE_POST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not Authorized, token failed") {
      dispatch(logout());
    }
    if (message === "Not Authorized, no token") {
      dispatch(logout());
    }
    dispatch({
      type: DELETE_POST_FAIL,
      payload: message,
    });
  }
};
