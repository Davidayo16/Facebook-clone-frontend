import React from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import VideogameAssetOutlinedIcon from "@mui/icons-material/VideogameAssetOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import OndemandVideoRoundedIcon from "@mui/icons-material/OndemandVideoRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import SportsEsportsRoundedIcon from "@mui/icons-material/SportsEsportsRounded";
import MessageRoundedIcon from "@mui/icons-material/MessageRounded";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <div className="header-wrapper ">
        <div className="container-xxl">
          <div className="row ">
            <div className="col-3 header-left d-flex align-items-center justify-content-center gap-2 ">
              <Link to={"/"}>
                <FacebookRoundedIcon
                  style={{ color: "rgb(25, 154, 177)", fontSize: "3.5rem" }}
                  className=""
                />
              </Link>
              <div className="flex search-container mt-2 mb-2 align-items-center">
                <SearchRoundedIcon style={{ fontSize: "1.5rem" }} />
                <input type="text" placeholder="Search facebook" />
              </div>
            </div>
            <div className="col-6 header-center d-flex justify-content-between align-items-center px-5">
              <div className="header-center-icons-home">
                <Link to={"/"}>
                  <HomeRoundedIcon
                    style={{ color: "rgb(25, 154, 177)", fontSize: "2rem" }}
                  />
                </Link>
              </div>
              <div className="header-center-icons">
                <PeopleOutlineIcon
                  style={{ fontSize: "2rem", color: "gray" }}
                />
              </div>
              <div className="header-center-icons">
                <OndemandVideoRoundedIcon
                  style={{ fontSize: "2rem", color: "gray" }}
                />
              </div>
              <div className="header-center-icons">
                <StorefrontOutlinedIcon
                  style={{ fontSize: "2rem", color: "gray" }}
                />
              </div>
              <div className="header-center-icons">
                <VideogameAssetOutlinedIcon
                  style={{ fontSize: "2rem", color: "gray" }}
                />
              </div>
            </div>
            <div className="col-3 header-right d-flex align-items-center gap-2">
              <MessageRoundedIcon
                style={{
                  fontSize: "2.4rem",
                  padding: "8px",
                  color: "black",
                  borderRadius: "50%",
                  background: "rgb(238, 238, 238)",
                }}
                className="message-notic"
              />
              <NotificationsRoundedIcon
                style={{
                  fontSize: "2.4rem",
                  padding: "6px",
                  color: "black",
                  borderRadius: "50%",
                  background: "rgb(238, 238, 238)",
                }}
                className="message-notic"
              />
              <img
                src="/images/user-img.jpg"
                className="img-fluid header-right-img"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
