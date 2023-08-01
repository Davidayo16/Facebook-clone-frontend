import React from "react";
import "./comments.css";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import { useSelector, useDispatch } from "react-redux";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaFacebookMessenger } from "react-icons/fa";
import { NOT_ACTIVE } from "../../Redux/Constants/CommentConstant";
import {
  createPostReview,
  getOnePost,
  getPosts,
  getUserPost,
  likeAndUnlikePost,
} from "../../Redux/Action/PostAction";
import { POST_CREATE_REVIEW_RESET } from "../../Redux/Constants/PostConstants";

const Comments = ({ post, loadingPost, userId }) => {
  const dispatch = useDispatch();

  const l = post?.likes?.length;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;

  const [like, setLike] = React.useState(0);

  const [isLiked, setIsLiked] = React.useState(false);
  const [likeOut, setLikeOut] = React.useState(
    isLiked ? `You & ${like - 1}` : like
  );

  const [comment, setCommentt] = React.useState("");

  React.useEffect(() => {
    setLikeOut(isLiked ? `You & ${like - 1}` : like);
  }, [isLiked, like]);

  React.useEffect(() => {
    setIsLiked(post?.likes?.includes(userInfo?._id));
  }, [userInfo?._id, post?.likes]);

  const likeHandle = (id) => {
    dispatch(likeAndUnlikePost(id));
    setLike((prevLike) => (isLiked ? prevLike - 1 : prevLike + 1));
    setIsLiked(!isLiked);
  };

  React.useEffect(() => {
    if (post?.likes) {
      setLike(post.likes.length); // Set the like state once post.likes is available
    }
  }, [post?.likes]);
  const setComment = useSelector((state) => state.setComment);
  const { isCommentActive } = setComment;

  const closeComment = () => {
    dispatch({ type: NOT_ACTIVE });
    dispatch(getPosts());
    dispatch(getUserPost(userId));
  };

  const postReview = useSelector((state) => state.postReview);

  const {
    loading: loadingCreateReview,
    error: errorCreateReview,
    success: successCreateReview,
  } = postReview;
  React.useEffect(() => {
    if (successCreateReview) {
      dispatch({ type: POST_CREATE_REVIEW_RESET });
      setCommentt("");
      dispatch(getOnePost(post?._id));
    }
  }, [dispatch, post?._id, successCreateReview]);

  const submitHandler = (e, id) => {
    e.preventDefault();

    if (comment) {
      dispatch(createPostReview(id, { comment }));
    }
  };

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

  const inputRef = React.useRef(null);

  const handleDivClick = () => {
    // Focus on the input element when the div is clicked
    inputRef.current.focus();
  };

  const com = React.useRef(null);
  React.useEffect(() => {
    if (com.current) {
      com.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [com, comment, post]);

  return (
    <>
      <div
        className={isCommentActive ? `comment-wrapper show` : `comment-wrapper`}
      >
        <div className="comment-main">
          <div className="comment-header d-flex justify-content-center align-items-center p-3">
            {loadingPost ? (
              <Skeleton width={150} height={20} />
            ) : (
              <h4>{post?.userId?.name} post</h4>
            )}
            <button className="btn mb-0" onClick={closeComment}>
              {loadingPost ? (
                <>
                  <Skeleton height={20} width={20} />
                </>
              ) : (
                <>
                  <span className="bar"></span>
                  <span className="bar"></span>
                  <span className="bar"></span>
                </>
              )}
            </button>
          </div>
          <div className="p-3">
            <div className="d-flex justify-content-between">
              <div className="d-flex gap-3">
                {loadingPost ? (
                  <Skeleton
                    height={30}
                    width={30}
                    circle={true}
                    className="img-fluid comment-img"
                  />
                ) : (
                  <img
                    src={
                      post?.userId?.profilePicture
                        ? post?.userId?.profilePicture
                        : "/images/ava.png"
                    }
                    className="img-fluid comment-img"
                  />
                )}
                <div>
                  <h4>{post?.userId?.name || <Skeleton />}</h4>
                  <span>
                    {moment(post?.createdAt).fromNow() || <Skeleton />} .
                  </span>
                  {}
                </div>
              </div>
              {loadingPost ? (
                <Skeleton
                  width={30}
                  height={30}
                  className="dot-icon"
                  circle={true}
                />
              ) : (
                <MoreVertRoundedIcon
                  style={{
                    fontSize: "2rem",
                    color: "black",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                  className="dot-icon"
                />
              )}
            </div>
            <p className="mt-2">{post?.desc || <Skeleton />}</p>
          </div>
          <div className="w-100 d-flex justify-content-center align-items-center comment-img-cont">
            {loadingPost ? (
              <Skeleton height={300} />
            ) : (
              <img src={post?.img} className="img-fluid w-90 imm" />
            )}
          </div>
          <div className="d-flex justify-content-between home-post-strip">
            <div className="d-flex gap-2 align-items-center">
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
                  {likeOut}{" "}
                  {isLiked ? "others" : like > 1 ? "people" : "person"} liked
                </span>
              ) : (
                <span>0 likes</span>
              )}
            </div>
            <span> {post?.reviews?.length} comments</span>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-2 px-sm-4 p-0">
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
          {post?.reviews?.length !== 0 ? (
            post?.reviews?.map((item) => {
              return (
                <div className="d-flex gap-2 p-3 comment-btm" ref={com}>
                  <img
                    src={item?.image ? item?.image : "/images/ava.png"}
                    className="img-fluid comment-img"
                  />
                  <div className="p-2 comment-text">
                    <b>{item?.name}</b>{" "}
                    <span> {formatTimeAgo(item?.createdAt)}</span>
                    <p className="mb-0">{item?.comment}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="w-100 d-flex justify-content-center align-items-center mt-3 mb-3">
              <p>No Comments</p>
            </div>
          )}

          <form
            className="comment-footer"
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
      </div>
    </>
  );
};

export default Comments;
