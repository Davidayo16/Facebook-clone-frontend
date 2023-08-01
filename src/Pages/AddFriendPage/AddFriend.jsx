import React from "react";
import "./addfriend.css";
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
  getAllUsers,
  getFriends,
  getUserDetails,
} from "../../Redux/Action/UserAction";
import { getUserPost, likeAndUnlikePost } from "../../Redux/Action/PostAction";
import moment from "moment";
import Side from "../../Components/Side/Side";
import FriendCard from "../../Components/FriendCard";

const AddFriend = () => {
  const history = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;
  const listFriends = useSelector((state) => state.listFriends);
  const { friends } = listFriends;

  const userAll = useSelector((state) => state.userAll);
  const { users } = userAll;
  console.log(users);
  React.useEffect(() => {
    dispatch(getFriends());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  return (
    <>
      <section className="home-wrapper">
        <div className="container-xxl">
          <div className="row">
            <Side />
            <div className="col-lg-9 col-12">
              <div className="mt-3 mb-3 p">
                <h3>People you may know</h3>
              </div>
              <div className="row">
                {users?.map((user) => {
                  return <FriendCard user={user} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddFriend;
