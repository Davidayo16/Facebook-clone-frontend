import {
  CREATE_CONVERSATION_FAIL,
  CREATE_CONVERSATION_REQUEST,
  CREATE_CONVERSATION_RESET,
  CREATE_CONVERSATION_SUCESS,
  FRIEND_CONVERSATION_FAIL,
  FRIEND_CONVERSATION_REQUEST,
  FRIEND_CONVERSATION_SUCESS,
  GET_CONVERSATION_FAIL,
  GET_CONVERSATION_REQUEST,
  GET_CONVERSATION_SUCESS,
  MSG_ACTIVE,
  MSG_NOT_ACTIVE,
  SET_CURRENT_CHAT,
  SET_CURRENT_MESSANGER,
} from "../Constants/MessageConstants";

export const getConversationsReducer = (
  state = { conversations: [] },
  action
) => {
  switch (action.type) {
    case GET_CONVERSATION_REQUEST:
      return { loading: true };
    case GET_CONVERSATION_SUCESS:
      return { loading: false, conversations: action.payload };
    case GET_CONVERSATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getFriendsConversationsReducer = (
  state = { friendsConversationss: null, loading: false, error: null },
  action
) => {
  switch (action.type) {
    case FRIEND_CONVERSATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FRIEND_CONVERSATION_SUCESS:
      return {
        ...state,
        loading: false,
        friendsConversationss: action.payload,
      };
    case FRIEND_CONVERSATION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const createFriendsConversationsReducer = (
  state = { friendsConvo: null, loading: false, error: null },
  action
) => {
  switch (action.type) {
    case CREATE_CONVERSATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_CONVERSATION_SUCESS:
      return {
        ...state,
        loading: false,
        success: true,
        friendsConvo: action.payload,
      };
    case CREATE_CONVERSATION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_CONVERSATION_RESET:
      return {};
    default:
      return state;
  }
};
// reducers.js
// import { SET_CURRENT_CHAT } from "./actions";

const initialState = {
  currentChat: null,
};

export const createChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_CHAT:
      return {
        ...state,
        currentChat: action.payload,
      };
    default:
      return state;
  }
};
export const createMessangerReducer = (
  state = { currentMessanger: {} },
  action
) => {
  switch (action.type) {
    case SET_CURRENT_MESSANGER:
      return {
        ...state,
        currentMessanger: action.payload,
      };
    default:
      return state;
  }
};

export const openMsgReducer = (state = { isMsgActive: false }, action) => {
  switch (action.type) {
    case MSG_ACTIVE:
      return { isMsgActive: true };

    case MSG_NOT_ACTIVE:
      return { isMsgActive: false };

    default:
      return state;
  }
};
