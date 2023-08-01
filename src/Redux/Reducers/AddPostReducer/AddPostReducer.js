import {
  IS_POST_ACTIVE,
  POST_NOT_ACTIVE,
} from "../../Constants/AddPostConstant";

export const addPostReducer = (state = { isPostActive: false }, action) => {
  switch (action.type) {
    case IS_POST_ACTIVE:
      return { isPostActive: true };

    case POST_NOT_ACTIVE:
      return { isPostActive: false };

    default:
      return state;
  }
};
