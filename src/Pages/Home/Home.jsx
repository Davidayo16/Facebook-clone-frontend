import React, { useEffect, useState } from "react";
import "./home.css";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import PhotoLibraryRoundedIcon from "@mui/icons-material/PhotoLibraryRounded";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../Redux/Action/PostAction";
import { getFriends, getUserDetails } from "../../Redux/Action/UserAction";
import HomeFeed from "../../Components/HomeFeed";

import Side from "../../Components/Side/Side";
import AddPost from "../../Components/AddPosts/AddPost";
import { IS_POST_ACTIVE } from "../../Redux/Constants/AddPostConstant";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonComments from "../../Components/SkeletonComponents/SkeletonComments/SkeletonComments";
import SkeletonOnlineFriends from "../../Components/SkeletonComponents/SkeletonOnlineFriends/SkeletonOnlineFriends";
import OnlineChats from "../../Components/OnlineChats";

const Home = ({ onlineUsers }) => {
  const [uploadStatus, setUploadStatus] = React.useState(false);
  const history = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, error } = userLogin;

  const listPosts = useSelector((state) => state.listPosts);
  const { posts, loading } = listPosts;
  console.log(loading);

  const listFriends = useSelector((state) => state.listFriends);
  const { friends, loading: loadingFriends } = listFriends;

  React.useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(getFriends(userInfo?._id));
  }, [dispatch]);

  const openPost = () => {
    dispatch({ type: IS_POST_ACTIVE });
  };

  return (
    <>
      <section className="home-wrapper">
        <div className="container-xxl">
          <div className="row">
            <Side />
            <AddPost />
            <div className="col-lg-6 col-md-9 col-sm-12  py-4 d-flex flex-column align-items-center">
              <div className="home-container">
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
                          What's on your mind,{" "}
                          <span className="">{userInfo?.name}</span>?
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="d-flex align-items-center post-vid justify-content-between px-4">
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

                <div className="mt-3">
                  {loading && (
                    <div>
                      <SkeletonComments />
                      <SkeletonComments />
                      <SkeletonComments />
                    </div>
                  )}
                  {posts?.map((post) => {
                    return (
                      <>
                        {/* {!loading && <h1>Loading</h1>}{" "} */}
                        <HomeFeed
                          post={post}
                          id={post?.userId}
                          key={post._id}
                          loadingg={loading}
                        />
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="col-lg-3 d-md-block d-none col-md-3 py-4 home-right">
              <div className="d-flex align-items-center">
                <img
                  className="img-fluid birthday-img"
                  src="/images/birthday.png"
                />
                <span>
                  <b>Anthony Jesse </b>and <b>3 others</b> have birthdays today
                </span>
              </div>
              <img className="img-fluid eating-img" src="/images/eating.jpg" />
              <div className="mt-4">
                <h5 className="bold">Online Friends</h5>
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
                <OnlineChats onlineUsers={onlineUsers} st={true} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
