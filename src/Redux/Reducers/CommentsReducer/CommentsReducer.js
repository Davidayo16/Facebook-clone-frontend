import { IS_ACTIVE, NOT_ACTIVE } from "../../Constants/CommentConstant";

export const commentReducer = (state = { isCommentActive: false }, action) => {
  switch (action.type) {
    case IS_ACTIVE:
      return { isCommentActive: true };

    case NOT_ACTIVE:
      return { isCommentActive: false };

    default:
      return state;
  }
};
