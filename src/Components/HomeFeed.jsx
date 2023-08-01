import React from "react";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import {
  createPostReview,
  getOnePost,
  likeAndUnlikePost,
} from "../Redux/Action/PostAction";
import Comments from "./Comments/Comments";
import { NOT_ACTIVE } from "../Redux/Constants/CommentConstant";
import { IS_ACTIVE } from "./../Redux/Constants/CommentConstant";
import { FaFacebookMessenger } from "react-icons/fa";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {
  ONE_POST_RESET,
  POST_CREATE_REVIEW_RESET,
} from "../Redux/Constants/PostConstants";

const HomeFeed = ({ post, id }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;
  const [like, setLike] = React.useState(post?.likes.length);
  const [isLiked, setIsLiked] = React.useState(false);

  const [likeOut, setLikeOut] = React.useState(
    isLiked ? `You & ${like - 1}` : like
  );

  const formatTimeAgo = (yourDate) => {
    const now = moment();
    const date = moment(yourDate);
    const duration = moment.duration(now.diff(date));
    const seconds = duration.asSeconds();
    const minutes = duration.asMinutes();
    const hours = duration.asHours();
    const days = duration.asDays();
    const weeks = duration.asWeeks();
    const years = duration.asYears();

    if (seconds < 60) {
      return `just now`;
    } else if (minutes < 60) {
      return `${Math.floor(minutes)}m ago`;
    } else if (hours < 24) {
      return `${Math.floor(hours)}h ago`;
    } else if (days < 7) {
      return `${Math.floor(days)}d ago`;
    } else if (weeks < 52) {
      return `${Math.floor(weeks)}w ago`;
    } else {
      return `${Math.floor(years)}y ago`;
    }
  };

  React.useEffect(() => {
    setLikeOut(isLiked ? `You & ${like - 1}` : like);
  }, [isLiked, like]);

  React.useEffect(() => {
    setIsLiked(post.likes.includes(userInfo?._id));
  }, [userInfo?._id, post.likes]);

  const likeHandle = (id) => {
    dispatch(likeAndUnlikePost(id));
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  const openComment = (id) => {
    dispatch(getOnePost(id));
    dispatch({ type: ONE_POST_RESET });
    dispatch({ type: IS_ACTIVE });
  };

  const onePost = useSelector((state) => state.onePost);
  const { singlePost, loading: loadingPost } = onePost;
  const [comment, setCommentt] = React.useState("");

  const postReview = useSelector((state) => state.postReview);
  const { success } = postReview;

  const submitHandler = async (e, id) => {
    e.preventDefault();
    if (comment) {
      setCommentt("");
      await dispatch(getOnePost(id));
      await dispatch({ type: IS_ACTIVE });
      await dispatch(createPostReview(id, { comment }));
    }
  };

  const [isShowComment, setShowComment] = React.useState(false);
  const inputRef = React.useRef(null);
  const handleDivClick = () => {
    // Focus on the input element when the div is clicked
    inputRef.current.focus();
    setShowComment((isShowComment) => !isShowComment);
  };
  return (
    <>
      <Comments
        loadingPost={loadingPost}
        post={singlePost}
        like={like}
        isLiked={isLiked}
        setLike={setLike}
        setIsLiked={setIsLiked}
      />
      <div className="home-body mt-4 mb-4">
        <div className="d-flex justify-content-between">
          <div className="d-flex gap-3 align-items-center">
            <img
              src={
                post?.userId?.profilePicture
                  ? post?.userId?.profilePicture
                  : "/images/ava.png"
              }
              className="img-fluid sidebar-left-img"
            />
            <span>{post?.userId?.name}</span>
            <span>{formatTimeAgo(post.createdAt)}</span>
          </div>
          <MoreVertRoundedIcon
            style={{
              fontSize: "2rem",
              color: "var(--color-dark-text)",
              borderRadius: "50%",
              cursor: "pointer",
            }}
            className="dot-icon"
          />
        </div>
        <h6 className="mb-0 mt-3 post-desc">{post?.desc}</h6>
        <img src={post?.img} className="img-fluid w-100 mt-3 imm" />
        <div className="d-flex justify-content-between home-post-strip">
          <div className="d-flex gap-2  ">
            <div>
              <ThumbUpRoundedIcon
                style={{
                  fontSize: "1.4rem",
                  color: "white",
                  borderRadius: "50%",
                  background: "blue",
                  padding: "3px",
                }}
              />
              <FavoriteRoundedIcon
                style={{
                  fontSize: "1.4rem",
                  color: "white",
                  borderRadius: "50%",
                  background: "red",
                  padding: "3px",
                }}
              />
            </div>
            {like !== 0 ? (
              <span>
                {likeOut} {isLiked ? "others" : like > 1 ? "people" : "person"}{" "}
                liked
              </span>
            ) : (
              <span>0 likes</span>
            )}
          </div>
          <span onClick={() => openComment(post._id)} className="view-comments">
            {post?.reviews?.length} comments
          </span>
        </div>
        <div className="d-flex justify-content-between like-com align-items-center mt-2 px-5">
          <div
            className="d-flex align-items-center  home-post-lcs"
            onClick={() => likeHandle(post._id)}
          >
            {isLiked ? (
              <ThumbUpIcon
                style={{
                  fontSize: "2rem",
                  color: "blue",
                  borderRadius: "50%",
                  // background: "blue",
                  padding: "3px",
                }}
              />
            ) : (
              <ThumbUpOffAltIcon
                style={{
                  fontSize: "2rem",
                  color: "black",
                  borderRadius: "50%",
                  // background: "blue",
                  padding: "3px",
                }}
              />
            )}
            <span>Like</span>
          </div>
          <div
            className="d-flex align-items-center  home-post-lcs"
            onClick={handleDivClick}
          >
            <ChatBubbleOutlineIcon
              style={{
                fontSize: "2rem",
                color: "black",
                borderRadius: "50%",
                //   background: "blue",
                padding: "3px",
              }}
            />
            <span>Comment</span>
          </div>
        </div>
        <form
          className={
            isShowComment
              ? "comment-footerr mt-2 mb-2 show"
              : "comment-footerr mt-2 mb-2"
          }
          onSubmit={(e) => submitHandler(e, post?._id)}
        >
          <div className="d-flex gap-3">
            <img
              src={
                userInfo?.profilePicture
                  ? userInfo?.profilePicture
                  : "/images/ava.png"
              }
              className="img-fluid comment-img"
            />

            <div className="comment-input-cont">
              <input
                type="text"
                ref={inputRef}
                className="comment-input"
                placeholder="Write a comment"
                value={comment}
                onChange={(e) => setCommentt(e.target.value)}
              />
              <button className="send-comment-btn" disabled={comment === ""}>
                <FaFacebookMessenger className="comment-fa" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default HomeFeed;
