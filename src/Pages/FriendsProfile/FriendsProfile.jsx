import React, { useEffect, useState } from "react";
import "./friendprofile.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  followUsers,
  getFriends,
  getUserDetails,
} from "../../Redux/Action/UserAction";
import { getUserPost, likeAndUnlikePost } from "../../Redux/Action/PostAction";
import moment from "moment";
import ProfileFeed from "../../Components/ProfileFeed";
import Side from "../../Components/Side/Side";
import { FaMinus, FaPlus } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import SkeletonComments from "../../Components/SkeletonComponents/SkeletonComments/SkeletonComments";
import {
  createConversations,
  setCurrentChat,
  setCurrentMessanger,
} from "../../Redux/Action/MessageAction";
import {
  CREATE_CONVERSATION_RESET,
  MSG_ACTIVE,
} from "../../Redux/Constants/MessageConstants";
import SkeletonOnlineFriends from "../../Components/SkeletonComponents/SkeletonOnlineFriends/SkeletonOnlineFriends";

const FriendsProfile = () => {
  // Navigation and dispatch
  const history = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Get user ID from URL
  const id = window.location.pathname.split("/")[2];
  console.log(id);

  // Redux state
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;

  const usersPost = useSelector((state) => state.usersPost);
  const { posts } = usersPost;
  console.log(posts);

  // State for handling likes
  const [like, setLike] = useState(posts?.likes?.length);
  console.log(like);
  const [isLiked, setIsLiked] = useState(false);

  // Check if the current user has liked the posts
  useEffect(() => {
    setIsLiked(posts?.likes?.includes(userInfo?._id));
  }, [userInfo?._id, posts?.likes]);

  // Handler for liking/unliking a post
  const likeHandler = (id) => {
    dispatch(likeAndUnlikePost(id));
    setLike((prevLike) => (isLiked ? prevLike - 1 : prevLike + 1));
    setIsLiked(!isLiked);
    console.log(id);
  };

  // Get user details on component mount and whenever the user ID changes
  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

  // Retrieve user details from the Redux store
  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading: loadingDetails } = userDetails;
  console.log(user);

  // Retrieve friends from the Redux store
  const listFriends = useSelector((state) => state.listFriends);
  const { friends, loading: loadingFriends } = listFriends;

  console.log(friends);

  // Fetch user's friends on component mount and whenever the user ID changes
  useEffect(() => {
    if (id === userInfo?._id) {
      // Redirect to the user's own profile if the current user's ID matches the profile ID
      history(`/profile/${userInfo?._id}`);
    } else {
      dispatch(getFriends(id));
    }
  }, [dispatch, id]);

  // Fetch user's posts on component mount and whenever the user ID changes
  useEffect(() => {
    dispatch(getUserPost(id));
  }, [dispatch, id]);
  console.log("FOLLOWERS", user?.user?.followers);
  const [isFollowing, setIsFollowing] = useState(false);

  // Check if the current user is following the profile user
  useEffect(() => {
    setIsFollowing(user?.user?.followers?.includes(userInfo?._id));
  }, [user?.user?.followers, user?.user?.following, user]);

  // Handle follow/unfollow action
  const handleFollow = () => {
    setIsFollowing((isFollowing) => !isFollowing);
    dispatch(followUsers(id));
  };

  // Fetch the user's conversation with friends on component mount and whenever the user ID changes
  const createConversationss = useSelector(
    (state) => state.createConversationss
  );
  const { friendsConvo, success } = createConversationss;

  const currentChatt = useSelector((state) => state.currentChatt);
  const { currentChat } = currentChatt;

  // Handle conversation selection
  const handleConvo = (senderId, recieverId, img, namee) => {
    console.log(senderId, recieverId);
    dispatch(createConversations({ senderId, recieverId }));
    dispatch(setCurrentMessanger({ name: namee, img: img }));
  };

  // Use the useEffect hook to set friendsConvo as currentChat once it's available
  useEffect(() => {
    if (success) {
      dispatch(setCurrentChat(friendsConvo));
      dispatch({ type: CREATE_CONVERSATION_RESET });

      dispatch({ type: MSG_ACTIVE });
      history("/message");
    }
  }, [success]);

  return (
    <>
      <section className="home-wrapper">
        <div className="container-xxl">
          <div className="row">
            <Side />
            <div className="col-lg-9 col-12">
              <div className="cover-containerr">
                {loadingDetails ? (
                  <Skeleton
                    className="img-fluid w-100 cover-imgg"
                    height={250}
                    width={150}
                    baseColor="white"
                  />
                ) : (
                  <img
                    src={
                      user?.user?.coverPicture
                        ? user?.user?.coverPicture
                        : "/images/cd.jpg"
                    }
                    className="img-fluid w-100 cover-imgg"
                  />
                )}
                {loadingDetails ? (
                  <Skeleton
                    className="img-fluid cover-user-imgg"
                    width={100}
                    height={100}
                    baseColor="white"
                  />
                ) : (
                  <img
                    src={
                      user?.user?.profilePicture
                        ? user?.user?.profilePicture
                        : "/images/ava.png"
                    }
                    className="img-fluid cover-user-imgg"
                  />
                )}
              </div>
              <div className="text-centerr ">
                {loadingDetails ? (
                  <Skeleton width={150} baseColor="white" />
                ) : (
                  <h4>{user?.user?.name}</h4>
                )}
                {loadingDetails ? (
                  <Skeleton width={150} baseColor="white" />
                ) : (
                  <h6>{user?.user?.desc}</h6>
                )}
              </div>
              <div className="row d-flex profile-cont">
                <div className="col-sm-7 py-4 d-flex flex-column  align-items-center">
                  <div className="home-container w-100">
                    <>
                      {loading && (
                        <div>
                          <SkeletonComments />
                          <SkeletonComments />
                          <SkeletonComments />
                        </div>
                      )}
                      {posts?.map((post) => {
                        return (
                          <ProfileFeed
                            post={post}
                            id={post?.userId}
                            userId={user?.user?._id}
                            key={post._id}
                          />
                        );
                      })}
                    </>
                  </div>
                </div>
                <div className="col-sm-5 col-12 py-4 prof home-right">
                  {loadingDetails ? (
                    <Skeleton
                      className={
                        isFollowing
                          ? "following mb-3 friend-follow d-flex gap-1"
                          : " unfollowing mb-3 friend-follow d-flex gap-1"
                      }
                    />
                  ) : (
                    <button
                      className={
                        isFollowing
                          ? "following mb-3 friend-follow d-flex gap-1"
                          : " unfollowing mb-3 friend-follow d-flex gap-1"
                      }
                      onClick={() => handleFollow(user?._id)}
                    >
                      {`${isFollowing ? "Unfollow" : "Follow"}`}
                      <span>{isFollowing ? <FaMinus /> : <FaPlus />}</span>
                    </button>
                  )}
                  {loadingDetails ? (
                    <Skeleton
                      className={
                        isFollowing
                          ? "following mb-3 friend-follow d-flex gap-1"
                          : " unfollowing mb-3 friend-follow d-flex gap-1"
                      }
                    />
                  ) : (
                    <button
                      className="dm"
                      disabled={!isFollowing}
                      onClick={() =>
                        handleConvo(
                          userInfo?._id,
                          user?.user?._id,
                          user?.user?.profilePicture,
                          user?.user?.name
                        )
                      }
                    >
                      <span>Message</span>
                    </button>
                  )}
                  {loadingDetails ? (
                    <Skeleton width={100} />
                  ) : (
                    <h5 className="bold">User Information</h5>
                  )}
                  {loadingDetails ? (
                    <Skeleton height={300} />
                  ) : (
                    <div>
                      <h6 className="bold mb-3 mt-3">
                        City:{" "}
                        <span>
                          {user?.user?.city ? user?.user?.city : "No city"}
                        </span>
                      </h6>
                      <h6 className="bold mb-3">
                        From:{" "}
                        <span>
                          {user?.user?.from ? user?.user?.from : "No country"}
                        </span>
                      </h6>
                      <h6 className="bold">
                        Relationship:{" "}
                        <span>
                          {user?.user?.relationship
                            ? user?.user?.relationship
                            : "Complicated"}
                        </span>
                      </h6>
                    </div>
                  )}

                  {loadingDetails ? (
                    <Skeleton width={100} />
                  ) : (
                    <h5 className="bold mt-5">User Friends</h5>
                  )}
                  <div className="row mt-3">
                    {loadingFriends && (
                      <>
                        <SkeletonOnlineFriends />
                        <SkeletonOnlineFriends />
                        <SkeletonOnlineFriends />
                        <SkeletonOnlineFriends />
                        <SkeletonOnlineFriends />
                        <SkeletonOnlineFriends />
                      </>
                    )}
                    {friends?.map((friend) => {
                      console.log(friend);
                      return (
                        <Link
                          to={`/friend/${friend?._id}`}
                          className="col-4 user-friend-div"
                        >
                          <div className="user-friend">
                            <img
                              src={
                                friend?.profilePicture
                                  ? friend?.profilePicture
                                  : "/images/ava.png"
                              }
                              className="img-fluid profile-friends-imgg"
                            />
                            <b className="text-centerr ">{friend?.name}</b>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FriendsProfile;
