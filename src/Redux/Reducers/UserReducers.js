import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_RESET,
  USER_FRIEND_REQUEST,
  USER_FRIEND_SUCCESS,
  USER_FRIEND_FAIL,
  USER_ALL_REQUEST,
  USER_ALL_SUCCESS,
  USER_ALL_FAIL,
  USER_UPDATE_REQUEST,
  USER_LOGIN_REQUEST2,
  USER_LOGIN_SUCCESS2,
  USER_LOGIN_FAIL2,
  USER_LOGOUT2,
} from "./../Constants/UserConstants";
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
export const userLoginReducer2 = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST2:
      return { loading: true };
    case USER_LOGIN_SUCCESS2:
      return { loading: false, userInfo: action.payload };

    case USER_LOGIN_FAIL2:
      return { loading: false, error: action.payload };
    case USER_LOGOUT2:
      return {};
    default:
      return state;
  }
};
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// USER DETAILS
export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export const userAllReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_ALL_REQUEST:
      return { ...state, loading: true };
    case USER_ALL_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case USER_ALL_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userFollowReducer = (state = { userr: {} }, action) => {
  switch (action.type) {
    case USER_ALL_REQUEST:
      return { ...state, loading: true };
    case USER_ALL_SUCCESS:
      return { ...state, loading: false, userr: action.payload };
    case USER_ALL_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// USER DETAILS
export const getFriendsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FRIEND_REQUEST:
      return { ...state, loading: true };
    case USER_FRIEND_SUCCESS:
      return { loading: false, friends: action.payload };
    case USER_FRIEND_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

//UPDATE USER DETAILS
export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
