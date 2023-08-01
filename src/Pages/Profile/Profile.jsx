import React, { useEffect, useState } from "react";
import "./profile.css";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import PhotoLibraryRoundedIcon from "@mui/icons-material/PhotoLibraryRounded";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getFriends, getUserDetails } from "../../Redux/Action/UserAction";
import { getUserPost, likeAndUnlikePost } from "../../Redux/Action/PostAction";
import moment from "moment";
import ProfileFeed from "../../Components/ProfileFeed";
import Side from "../../Components/Side/Side";
import { IS_POST_ACTIVE } from "../../Redux/Constants/AddPostConstant";
import AddPost from "../../Components/AddPosts/AddPost";
import EditIcon from "@mui/icons-material/Edit";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import EditProfile from "../../Components/EditProfile/EditProfile";
import SkeletonComments from "../../Components/SkeletonComponents/SkeletonComments/SkeletonComments";
import Skeleton from "react-loading-skeleton";
import SkeletonOnlineFriends from "../../Components/SkeletonComponents/SkeletonOnlineFriends/SkeletonOnlineFriends";

const Profile = () => {
  // Navigation and dispatch
  const history = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Get user ID from URL
  const id = window.location.pathname.split("/")[2];

  // Redux state
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, error } = userLogin;

  const usersPost = useSelector((state) => state.usersPost);
  const { posts, loading } = usersPost;

  // State for handling likes
  const [like, setLike] = useState(posts?.likes?.length);
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
  };

  // Get user details on component mount and whenever the user ID changes
  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id, userInfo]);

  // Retrieve user details from the Redux store
  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading: loadingDetails } = userDetails;

  const listFriends = useSelector((state) => state.listFriends);
  const { friends, loading: loadingFriends } = listFriends;

  // Fetch user's friends on component mount and whenever the user ID changes
  useEffect(() => {
    dispatch(getFriends(id));
  }, [dispatch, id]);

  // Fetch user's posts on component mount and whenever the user ID changes
  useEffect(() => {
    dispatch(getUserPost(id));
  }, [dispatch, id, userInfo]);

  // Open the add post section
  const openPost = () => {
    dispatch({ type: IS_POST_ACTIVE });
  };

  // State for controlling profile edit modal
  const [isProfileActive, setProfileActive] = useState(false);

  return (
    <>
      <section className="home-wrapper">
        <div className="container-xxl">
          <div className="row">
            <EditProfile
              id={id}
              user={user}
              isProfileActive={isProfileActive}
              setProfileActive={setProfileActive}
            />
            <Side />
            <AddPost />

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
                    className="cover-user-imgg"
                    width={100}
                    height={100}
                    baseColor="white"
                  />
                ) : (
                  <div className="cover-user-imgg">
                    <img
                      src={
                        user?.user?.profilePicture
                          ? user?.user?.profilePicture
                          : "/images/ava.png"
                      }
                      className="img-fluid "
                    />
                    <div
                      className="change-photo"
                      onClick={() => setProfileActive(true)}
                    >
                      <AddAPhotoIcon />
                    </div>
                  </div>
                )}
              </div>
              <div className="text-centerr">
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
                    <div className="home-top">
                      <div className="d-flex home-top-item gap-3">
                        {loading ? (
                          <Skeleton
                            circle={true}
                            height={40}
                            width={40}
                            className="img-fluid header-right-img"
                          />
                        ) : (
                          <img
                            src={
                              userInfo?.profilePicture
                                ? userInfo?.profilePicture
                                : "/images/ava.png"
                            }
                            className="img-fluid header-right-img"
                          />
                        )}

                        <div className="w-100  mind" onClick={openPost}>
                          {loading ? (
                            <Skeleton />
                          ) : (
                            <p className="mb-0">
                              What's on your mind, {userInfo?.name}?
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between px-4">
                        {loading ? (
                          <Skeleton
                            className="d-flex align-items-center mb-4 gap-2 home-item-bottom"
                            width={100}
                          />
                        ) : (
                          <div className="d-flex align-items-center mb-4 gap-2 home-item-bottom">
                            <VideocamRoundedIcon
                              style={{
                                fontSize: "2rem",
                                color: "red",

                                borderRadius: "50%",
                              }}
                            />
                            <span>Gaming</span>
                          </div>
                        )}

                        {loading ? (
                          <Skeleton
                            width={100}
                            className="d-flex align-items-center mb-4 gap-2 home-item-bottom"
                          />
                        ) : (
                          <div
                            className="d-flex align-items-center mb-4 gap-2 home-item-bottom"
                            onClick={openPost}
                          >
                            <PhotoLibraryRoundedIcon
                              style={{
                                fontSize: "2rem",
                                color: "green",

                                borderRadius: "50%",
                              }}
                            />
                            <span>Photo/Video</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <>
                      {loading && (
                        <div>
                          <SkeletonComments />
                          <SkeletonComments />
                          <SkeletonComments />
                        </div>
                      )}
                      {posts?.length === 0 ? (
                        <div className="dum-post mt-2">
                          <div className="first-img">
                            <img className="img-fluid" src="/images/wel.png" />
                          </div>
                          <div className="first-div">
                            <button
                              className="first-post-btn"
                              onClick={openPost}
                            >
                              Add your first post
                            </button>
                          </div>
                        </div>
                      ) : (
                        posts?.map((post) => (
                          <ProfileFeed
                            post={post}
                            id={post?.userId}
                            key={post._id}
                            userId={userInfo?._id}
                          />
                        ))
                      )}
                    </>
                  </div>
                </div>
                <div className="col-sm-5 col-12 py-4 prof home-right">
                  <h5 className="bold">User Information</h5>
                  <div>
                    {loadingDetails ? (
                      <Skeleton className="bold mb-3 mt-3" width={100} />
                    ) : (
                      <h6 className="bold mb-3 mt-3">
                        City:{" "}
                        <span>
                          {user?.user?.city ? user?.user?.city : "No city"}
                        </span>
                      </h6>
                    )}
                    {loadingDetails ? (
                      <Skeleton className="bold mb-3 mt-3" width={100} />
                    ) : (
                      <h6 className="bold mb-3">
                        From:{" "}
                        <span>
                          {user?.user?.from ? user?.user?.from : "No country"}
                        </span>
                      </h6>
                    )}
                    {loadingDetails ? (
                      <Skeleton className="bold mb-3 mt-3" width={100} />
                    ) : (
                      <h6 className="bold">
                        Relationship:{" "}
                        <span>
                          {user?.user?.relationship
                            ? user?.user?.relationship
                            : "Complicated"}
                        </span>
                      </h6>
                    )}
                    {loadingDetails ? (
                      <Skeleton className="edit-profile" />
                    ) : (
                      <button
                        className="edit-profile"
                        onClick={() => setProfileActive(true)}
                      >
                        <EditIcon />
                        Edit profile
                      </button>
                    )}
                  </div>

                  <h5 className="bold mt-5">User Friends</h5>
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

export default Profile;
