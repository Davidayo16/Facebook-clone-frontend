import axios from "axios";
import {
  CREATE_CONVERSATION_FAIL,
  CREATE_CONVERSATION_REQUEST,
  CREATE_CONVERSATION_SUCESS,
  FRIEND_CONVERSATION_FAIL,
  FRIEND_CONVERSATION_REQUEST,
  FRIEND_CONVERSATION_SUCESS,
  GET_CONVERSATION_FAIL,
  GET_CONVERSATION_REQUEST,
  GET_CONVERSATION_SUCESS,
  SET_CURRENT_CHAT,
  SET_CURRENT_MESSANGER,
} from "../Constants/MessageConstants";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Replace with your environment variable name
});
export const getConversations = (id) => async (dispatch, getState) => {
  let url = `/api/conversation/${id}`;

  try {
    dispatch({ type: GET_CONVERSATION_REQUEST });
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
    dispatch({ type: GET_CONVERSATION_SUCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_CONVERSATION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getFriendConversations =
  (friendId) => async (dispatch, getState) => {
    let url = `/api/conversation/?userId=${friendId}`;

    try {
      dispatch({ type: FRIEND_CONVERSATION_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      console.log(userInfo.token);
      const config = {
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await api.get(url, config);
      console.log(data);
      dispatch({ type: FRIEND_CONVERSATION_SUCESS, payload: data });
    } catch (error) {
      dispatch({
        type: FRIEND_CONVERSATION_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const createConversations = (convo) => async (dispatch, getState) => {
  let url = `/api/conversation`;

  try {
    dispatch({ type: CREATE_CONVERSATION_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    console.log(userInfo.token);
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await api.post(url, convo, config);
    console.log(data);
    dispatch({ type: CREATE_CONVERSATION_SUCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_CONVERSATION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const setCurrentChat = (chat) => (dispatch, getState) => {
  dispatch({
    type: SET_CURRENT_CHAT,
    payload: chat,
  });
};

export const setCurrentMessanger = (chat) => (dispatch, getState) => {
  dispatch({
    type: SET_CURRENT_MESSANGER,
    payload: chat,
  });
};
