import {
  DELETE_POST_FAIL,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  LIKE_POST_FAIL,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  ONE_POST_FAIL,
  ONE_POST_REQUEST,
  ONE_POST_RESET,
  ONE_POST_SUCCESS,
  POST_CREATE_REVIEW_FAIL,
  POST_CREATE_REVIEW_REQUEST,
  POST_CREATE_REVIEW_RESET,
  POST_CREATE_REVIEW_SUCCESS,
  SINGLE_POST_FAIL,
  SINGLE_POST_REQUEST,
  SINGLE_POST_SUCCESS,
  TIMELINE_POST_FAIL,
  TIMELINE_POST_REQUEST,
  TIMELINE_POST_SUCCESS,
} from "../Constants/PostConstants";

export const getPostsReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case TIMELINE_POST_REQUEST:
      return { loading: true };
    case TIMELINE_POST_SUCCESS:
      return { loading: false, posts: action.payload };
    case TIMELINE_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getUserPostReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case SINGLE_POST_REQUEST:
      return { loading: true };
    case SINGLE_POST_SUCCESS:
      return { loading: false, posts: action.payload };
    case SINGLE_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getOnePostReducer = (state = { singlePost: [] }, action) => {
  switch (action.type) {
    case ONE_POST_REQUEST:
      return { loading: true };
    case ONE_POST_SUCCESS:
      return { loading: false, singlePost: action.payload };
    case ONE_POST_FAIL:
      return { loading: false, error: action.payload };
    case ONE_POST_RESET:
      return {};
    default:
      return state;
  }
};

export const likePostReducer = (state = {}, action) => {
  switch (action.type) {
    case LIKE_POST_REQUEST:
      return { loading: true };
    case LIKE_POST_SUCCESS:
      return { loading: false, likee: action.payload };
    case LIKE_POST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const postCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case POST_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case POST_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case POST_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const deletePostReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_POST_REQUEST:
      return { loading: true };
    case DELETE_POST_SUCCESS:
      return { loading: false, success: true };
    case DELETE_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
