import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  getFriendsReducer,
  userAllReducer,
  userDetailsReducer,
  userFollowReducer,
  userLoginReducer,
  userLoginReducer2,
  userRegisterReducer,
  userUpdateReducer,
} from "./Reducers/UserReducers";
import {
  deletePostReducer,
  getOnePostReducer,
  getPostsReducer,
  getUserPostReducer,
  likePostReducer,
  postCreateReviewReducer,
} from "./Reducers/PostReducer";
import { commentReducer } from "./Reducers/CommentsReducer/CommentsReducer";
import { addPostReducer } from "./Reducers/AddPostReducer/AddPostReducer";
import {
  createChatReducer,
  createFriendsConversationsReducer,
  createMessangerReducer,
  getConversationsReducer,
  getFriendsConversationsReducer,
  openMsgReducer,
} from "./Reducers/MessageReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userLogin2: userLoginReducer2,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  listPosts: getPostsReducer,
  listFriends: getFriendsReducer,
  usersPost: getUserPostReducer,
  onePost: getOnePostReducer,
  likePostt: likePostReducer,
  deletePostt: deletePostReducer,
  setComment: commentReducer,
  setPost: addPostReducer,
  postReview: postCreateReviewReducer,
  userAll: userAllReducer,
  userFollow: userFollowReducer,
  conversationGet: getConversationsReducer,
  friendsConversations: getFriendsConversationsReducer,
  createConversationss: createFriendsConversationsReducer,
  currentChatt: createChatReducer,
  currentMessangerr: createMessangerReducer,
  openMsg: openMsgReducer,
});

const userInfoFromLocalStorage = localStorage.getItem("userInfooo")
  ? JSON.parse(localStorage.getItem("userInfooo"))
  : null;

const innitialState = {
  userLogin: {
    userInfo: userInfoFromLocalStorage,
  },
  userLogin2: {
    userInfo: userInfoFromLocalStorage,
  },
};
const Middleware = [thunk];
const store = createStore(
  reducer,
  innitialState,
  composeWithDevTools(applyMiddleware(...Middleware))
);

export default store;
