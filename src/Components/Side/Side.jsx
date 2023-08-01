import React from "react";
import "./Side.css";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import FeedbackRoundedIcon from "@mui/icons-material/FeedbackRounded";
import Groups2RoundedIcon from "@mui/icons-material/Groups2Rounded";
import MessageRoundedIcon from "@mui/icons-material/MessageRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import OndemandVideoRoundedIcon from "@mui/icons-material/OndemandVideoRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import SportsEsportsRoundedIcon from "@mui/icons-material/SportsEsportsRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import PhotoLibraryRoundedIcon from "@mui/icons-material/PhotoLibraryRounded";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getFriends,
  getUserDetails,
  logout,
} from "../../Redux/Action/UserAction";
import { getUserPost, likeAndUnlikePost } from "../../Redux/Action/PostAction";
import moment from "moment";
import LogoutIcon from "@mui/icons-material/Logout";
import SkeletonOnlineFriends from "../SkeletonComponents/SkeletonOnlineFriends/SkeletonOnlineFriends";

const Side = () => {
  const history = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;
  const listFriends = useSelector((state) => state.listFriends);
  const { friends, loading: loadingFriends } = listFriends;

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="col-3 sidebar py-4 d-lg-block d-none">
      <div>
        <ul className="px-0">
          <Link to={`/profile/${userInfo?._id}`}>
            <li className="d-flex align-items-center mb-2 gap-3">
              <img
                src={
                  userInfo?.profilePicture
                    ? userInfo?.profilePicture
                    : "/images/ava.png"
                }
                className="img-fluid sidebar-left-img"
              />
              <span>{userInfo?.name}</span>
            </li>
          </Link>
          <Link to={`/friends`}>
            <li className="d-flex align-items-center mb-3 gap-3">
              <PeopleRoundedIcon
                style={{ fontSize: "1.8rem", color: "rgb(25, 154, 177)" }}
              />
              <span>Friends</span>
            </li>
          </Link>
          <Link to={"/message"}>
            <li className="d-flex align-items-center mb-3 gap-3">
              <MessageRoundedIcon
                style={{ fontSize: "1.8rem", color: "rgb(25, 154, 177)" }}
              />
              <span>Messanger</span>
            </li>
          </Link>
          <li className="d-flex align-items-center mb-3 gap-3">
            <FeedbackRoundedIcon
              style={{ fontSize: "1.8rem", color: "rgb(25, 154, 177)" }}
            />
            <span>Feeds (Most Recent)</span>
          </li>
          <li className="d-flex align-items-center mb-3 gap-3">
            <Groups2RoundedIcon
              style={{
                fontSize: "1.8rem",
                background: "rgb(25, 154, 177)",
                color: "white",
                padding: "3px",
                borderRadius: "50%",
              }}
            />
            <span>Groups</span>
          </li>

          <li className="d-flex align-items-center mb-3 gap-3">
            <StorefrontRoundedIcon
              style={{ fontSize: "1.8rem", color: "rgb(25, 154, 177)" }}
            />
            <span>Marketplace</span>
          </li>
          <li className="d-flex align-items-center mb-3 gap-3">
            <OndemandVideoRoundedIcon
              style={{ fontSize: "1.8rem", color: "rgb(25, 154, 177)" }}
            />
            <span>Watch</span>
          </li>
          <li className="d-flex align-items-center mb-3 gap-3">
            <BookmarkRoundedIcon
              style={{
                fontSize: "1.8rem",
                color: "rgb(25, 154, 177)",
              }}
            />
            <span>Saved</span>
          </li>
          <li className="d-flex align-items-center mb-3 gap-3">
            <SportsEsportsRoundedIcon
              style={{ fontSize: "1.8rem", color: "rgb(25, 154, 177)" }}
            />
            <span>Gaming video</span>
          </li>
          <li
            className="d-flex align-items-center mb-3 gap-3"
            onClick={handleLogout}
          >
            <LogoutIcon
              style={{
                fontSize: "1.3rem",
                color: "red",
                background: "",
                borderRadius: "50%",
              }}
            />
            <span>Log out</span>
          </li>
          <li className="d-flex align-items-center mb-3 gap-3">
            <KeyboardArrowDownRoundedIcon
              style={{
                fontSize: "1.3rem",
                color: "black",
                background: " rgb(238, 238, 238)",
                borderRadius: "50%",
              }}
            />
            <span>Friends of friends</span>
          </li>
        </ul>
        <div className="underline"></div>
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
          return (
            <Link
              to={`/friend/${friend?._id}`}
              className="d-flex align-items-center gap-3 mt-4"
            >
              <div className="online-dot-container">
                <img
                  src={
                    friend?.profilePicture
                      ? friend?.profilePicture
                      : "/images/ava.png"
                  }
                  className="img-fluid profile-friends-img"
                />
              </div>
              <h6 className="online-name">{friend?.name}</h6>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Side;
