import axios from "axios";
import {
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_FRIEND_REQUEST,
  USER_FRIEND_SUCCESS,
  USER_FRIEND_FAIL,
  USER_ALL_REQUEST,
  USER_ALL_SUCCESS,
  USER_ALL_FAIL,
  USER_FOLLOW_FAIL,
  USER_FOLLOW_SUCCESS,
  USER_FOLLOW_REQUEST,
  USER_LOGIN_REQUEST2,
  USER_LOGIN_SUCCESS2,
  USER_LOGIN_FAIL2,
} from "../Constants/UserConstants";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
} from "./../Constants/UserConstants";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  LIKE_POST_FAIL,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
} from "../Constants/PostConstants";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Replace with your environment variable name
});
console.log(api);

//******LOGIN*****
export const login = (email, password) => async (dispatch) => {
  console.log("email", email, "pass", password);
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await api.post(
      "/api/users/login",
      { email, password },
      config
    );
    console.log(data);

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfooo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const login2 = (email, password) => async (dispatch) => {
  console.log("email", email, "pass", password);
  try {
    dispatch({ type: USER_LOGIN_REQUEST2 });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await api.post(
      "/api/users/login",
      { email, password },
      config
    );
    console.log(data);

    dispatch({ type: USER_LOGIN_SUCCESS2, payload: data });

    localStorage.setItem("userInfooo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL2,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// REGISTER
export const register = (name, email, password) => async (dispatch) => {
  console.log("name", name, "email", email, "password", password);
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await api.post(
      "/api/users/register",
      { name, email, password },
      config
    );
    console.log(data);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfooo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// USER DETAILS
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await api.get(`/api/users/${id}`, config);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not Authorized, no token") {
      dispatch(logout());
    }
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const getAllUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_ALL_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await api.get(`/api/users/all`, config);

    dispatch({ type: USER_ALL_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not Authorized, no token") {
      dispatch(logout());
    }
    dispatch({
      type: USER_ALL_FAIL,
      payload: message,
    });
  }
};

// UPDATE PROFILE
export const updateUser = (newPost) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await api.put("/api/users/profile", newPost, config);

    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfooo", JSON.stringify(data));
    console.log(data);
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
      type: USER_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const getFriends = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_FRIEND_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await api.get(`/api/users/friends/${id}`, config);

    dispatch({ type: USER_FRIEND_SUCCESS, payload: data });
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
      type: USER_FRIEND_FAIL,
      payload: message,
    });
  }
};

export const followUsers = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_FOLLOW_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await api.post(`/api/users/${id}/follow`, {}, config);

    dispatch({ type: USER_FOLLOW_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not Authorized, no token") {
      dispatch(logout());
    }
    dispatch({
      type: USER_FOLLOW_FAIL,
      payload: message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfooo");
  dispatch({ type: USER_LOGOUT });
  document.location.href = "/login";
};
