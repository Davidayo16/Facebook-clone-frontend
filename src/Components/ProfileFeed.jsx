import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import MoodRoundedIcon from "@mui/icons-material/MoodRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import { FaFacebookMessenger } from "react-icons/fa";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import moment from "moment";
import {
  createPostReview,
  deletePost,
  getOnePost,
  getPosts,
  getUserPost,
  likeAndUnlikePost,
} from "../Redux/Action/PostAction";
import { IS_ACTIVE } from "../Redux/Constants/CommentConstant";
import Comments from "./Comments/Comments";
import Loading from "./Loading/Error/Loading";

const ProfileFeed = ({ post, userId }) => {
  // React Router Hooks
  const history = useNavigate();
  const location = useLocation();

  // Redux state
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;

  const usersPost = useSelector((state) => state.usersPost);
  const { posts } = usersPost;

  const deletePostt = useSelector((state) => state.deletePostt);
  const { loading: loadingDel } = deletePostt;

  // State for handling likes
  const [like, setLike] = useState(post?.likes?.length);
  const [isLiked, setIsLiked] = useState(false);

  // State for displaying the like count with "You & X" format
  const [likeOut, setLikeOut] = useState(isLiked ? `You & ${like - 1}` : like);

  // Update the likeOut state whenever isLiked or like changes
  useEffect(() => {
    setLikeOut(isLiked ? `You & ${like - 1}` : like);
  }, [isLiked, like]);

  // Check if the current user has liked the post
  useEffect(() => {
    setIsLiked(post?.likes?.includes(userInfo?._id));
  }, [userInfo?._id, post?.likes]);

  // Handler for liking/unliking a post
  const likeHandler = (id) => {
    dispatch(likeAndUnlikePost(id));
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  // State for handling comment input
  const [comment, setCommentt] = useState("");

  // Function to format time ago from a given date
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

  // Handle comment submission
  const submitHandler = async (e, id) => {
    e.preventDefault();

    if (comment) {
      setCommentt("");
      await dispatch(getOnePost(id));
      await dispatch({ type: IS_ACTIVE });
      await dispatch(createPostReview(id, { comment }));
    }
  };

  // Get single post details
  const onePost = useSelector((state) => state.onePost);
  const { singlePost, loading: loadingPost } = onePost;
  console.log(singlePost);

  // State for controlling comment display
  const [isShowComment, setShowComment] = useState(false);

  // Ref for the comment input element
  const inputRef = useRef(null);

  // Handle div click and focus on the input element
  const handleDivClick = () => {
    inputRef.current.focus();
    setShowComment((isShowComment) => !isShowComment);
  };

  // Function to open the post comment section
  const openComment = (id) => {
    dispatch(getOnePost(id));
    dispatch({ type: IS_ACTIVE });
  };

  // State for handling loading state while deleting a post
  const [loadingDelete, setLoadingDelete] = useState({});

  // Handle post deletion
  const handleDeletePost = async (id) => {
    try {
      setLoadingDelete((prevState) => ({
        ...prevState,
        [id]: true, // Set loading state for the specific post ID to true
      }));

      await dispatch(deletePost(id));
      await dispatch(getPosts());
      await dispatch(getUserPost(userInfo?._id));

      setLoadingDelete((prevState) => ({
        ...prevState,
        [id]: false, // Set loading state for the specific post ID back to false
      }));
    } catch (error) {
      console.error("Error while deleting post:", error);
      setLoadingDelete((prevState) => ({
        ...prevState,
        [id]: false, // Set loading state for the specific post ID back to false in case of error
      }));
    }
  };

  return (
    <>
      <Comments post={singlePost} loadingPost={loadingPost} userId={userId} />

      <div className="mt-3">
        <div className="home-body mt-3">
          <div className="d-flex justify-content-between">
            <div className="d-flex gap-3 align-items-center">
              <img
                src={
                  user?.user?.profilePicture
                    ? user?.user?.profilePicture
                    : "/images/ava.png"
                }
                className="img-fluid sidebar-left-img"
              />
              <span>{user?.user?.name}</span>
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
          <p className="mb-0 mt-3 post-desc">{post?.desc}</p>
          <img src={post?.img} className="img-fluid w-100 mt-3 imm" />
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
            <span
              onClick={() => openComment(post._id)}
              className="view-comments"
            >
              {post?.reviews?.length} comments
            </span>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-2 px-sm-4 px-0">
            <div
              className="d-flex align-items-center  home-post-lcs"
              onClick={() => likeHandler(post?._id)}
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
                    color: "var(--color-dark-text)",
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
                  color: "var(--color-dark-text)",
                  borderRadius: "50%",
                  //   background: "blue",
                  padding: "3px",
                }}
              />
              <span>Comment</span>
            </div>
            {user?.user?._id === userInfo?._id && (
              <button
                className="d-flex align-items-center  home-post-lcs"
                onClick={() => handleDeletePost(post?._id)}
                disabled={loadingDelete[post?._id]}
              >
                <DeleteIcon
                  style={{
                    fontSize: "2rem",
                    color: loadingDelete[post?._id] ? "white" : "red",
                    borderRadius: "50%",
                    //   background: "blue",
                    padding: "3px",
                  }}
                />
                <span
                  style={{
                    color: "var(--color-dark-text)",
                  }}
                >
                  Delete
                </span>
                {loadingDelete[post?._id] && <Loading />}
              </button>
            )}
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
      </div>
    </>
  );
};

export default ProfileFeed;
