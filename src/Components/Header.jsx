import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NightlightIcon from "@mui/icons-material/Nightlight";
import LightModeIcon from "@mui/icons-material/LightMode";

const Header = () => {
  const navigate = useNavigate();
  const [chatTheme, setChatTheme] = React.useState(
    localStorage.getItem("chatThemee")
      ? JSON.parse(localStorage.getItem("chatThemee"))
      : "dark"
  );

  const handleTheme = () => {
    if (chatTheme === "light") {
      setChatTheme("dark");
    } else {
      setChatTheme("light");
    }
  };

  React.useEffect(() => {
    document.documentElement.className = chatTheme;
    localStorage.setItem("chatThemee", JSON.stringify(chatTheme));
  }, [chatTheme]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;

  const currentLocation = window.location.pathname;
  const handleBookmark = () => {
    if (currentLocation !== "/bookmark") {
      navigate("/bookmark");
    } else {
      navigate(-1);
    }
  };
  const [activeLink, setActiveLink] = React.useState(""); // Set the default active link

  const handleIconClick = (link) => {
    setActiveLink(link);
  };

  const handleActiveLink = () => {
    const pathname = window.location.pathname;
    if (pathname === "/") {
      setActiveLink("home");
    } else if (pathname === "/friends") {
      setActiveLink("friends");
    } else if (pathname === "/message") {
      setActiveLink("message");
    } else if (pathname.startsWith("/profile/")) {
      setActiveLink(""); // For the dynamic profile route
    } else if (pathname.startsWith("/friend/")) {
      setActiveLink(""); // For the dynamic profile route
    } else if (pathname === "/bookmark") {
      setActiveLink("");
    }
    // Add more conditions for other links as needed
  };

  // Use the useLocation hook to update the active link when the pathname changes
  const location = useLocation();

  useEffect(() => {
    handleActiveLink();
  }, [location.pathname]);

  return (
    <>
      <div className="header-wrapper ">
        <div className="container-xxl">
          <div className="row ">
            <div className="col-md-4 col-12 header-left d-flex align-items-center justify-content-between gap-2 ">
              <Link to={"/"} className="d-sm-block d-none ">
                <img
                  className="img-fluid"
                  src="/images/v.png"
                  style={{ width: "35px" }}
                />
              </Link>
              <Link to={"/"} className="d-sm-none d-block">
                <img
                  className="img-fluid"
                  src="/images/v.png"
                  style={{ width: "30px" }}
                />
              </Link>
              <div className="d-flex search-containerr mt-2 mb-2 align-items-center d-sm-flex d-none">
                <SearchRoundedIcon style={{ fontSize: "1.5rem" }} />
                <input
                  type="text"
                  className="head-in"
                  placeholder="Search facebook"
                />
              </div>
              <div className="col-md-3 col-3 header-right d-flex d-md-none align-items-center gap-2">
                <MenuIcon
                  onClick={handleBookmark}
                  style={{
                    fontSize: "3rem",
                    padding: "6px",
                    color: "var(--color-dark-text)",
                    borderRadius: "50%",
                    background: "NONE",
                  }}
                  className="message-noticee d-lg-none d-block "
                />
                {chatTheme === "light" ? (
                  <NightlightIcon
                    style={{
                      fontSize: "2.4rem",
                      padding: "6px",
                      color: "black",
                      borderRadius: "50%",
                      // background: "rgb(238, 238, 238)",
                    }}
                    onClick={handleTheme}
                    className="message-noticee"
                  />
                ) : (
                  <LightModeIcon
                    style={{
                      fontSize: "2.4rem",
                      padding: "6px",
                      color: "white",
                      borderRadius: "50%",
                      // background: "rgb(238, 238, 238)",
                    }}
                    onClick={handleTheme}
                    className="message-noticee"
                  />
                )}
                <Link to={`/profile/${userInfo?._id}`}>
                  <div className="header-right-img-div ">
                    <img
                      src={
                        userInfo?.profilePicture
                          ? userInfo?.profilePicture
                          : "/images/ava.png"
                      }
                      className="img-fluid header-right-img"
                    />
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-md-6 col-6 header-center d-flex col-12 justify-content-between align-items-center px-0">
              <Link
                to={"/"}
                className={`header-center-icons-home ${
                  activeLink === "home" ? "active" : ""
                }`}
                onClick={() => handleIconClick("home")}
              >
                <HomeRoundedIcon
                  style={{
                    color: activeLink === "home" ? "rgb(25, 154, 177)" : "gray",
                    fontSize: "2rem",
                  }}
                />
              </Link>
              <Link
                to={"/friends"}
                className={`header-center-icons ${
                  activeLink === "friends" ? "active" : ""
                }`}
                onClick={() => handleIconClick("friends")}
              >
                <PeopleOutlineIcon
                  style={{
                    color:
                      activeLink === "friends" ? "rgb(25, 154, 177)" : "gray",
                    fontSize: "2rem",
                  }}
                />
              </Link>
              <Link
                to={"/message"}
                className={`header-center-icons ${
                  activeLink === "message" ? "active" : ""
                }`}
                onClick={() => handleIconClick("message")}
              >
                <MessageRoundedIcon
                  style={{
                    color:
                      activeLink === "message" ? "rgb(25, 154, 177)" : "gray",
                    fontSize: "2rem",
                  }}
                />
              </Link>
              <button className="header-center-icons d" disabled>
                <OndemandVideoRoundedIcon
                  style={{ fontSize: "2rem", color: "gray" }}
                />
              </button>
            </div>
            <div className="col-md-2 col-3 d-md-flex d-none header-right d-flex align-items-center gap-2">
              <MenuIcon
                onClick={handleBookmark}
                style={{
                  fontSize: "3rem",
                  padding: "6px",
                  color: "var(--color-dark-text)",
                  borderRadius: "50%",
                  background: "NONE",
                }}
                className="message-noticee d-lg-none d-block"
              />
              {chatTheme === "light" ? (
                <NightlightIcon
                  style={{
                    fontSize: "2.4rem",
                    padding: "6px",
                    color: "black",
                    borderRadius: "50%",
                    // background: "rgb(238, 238, 238)",
                  }}
                  onClick={handleTheme}
                  className="message-noticee"
                />
              ) : (
                <LightModeIcon
                  style={{
                    fontSize: "2.4rem",
                    padding: "6px",
                    color: "white",
                    borderRadius: "50%",
                    // background: "rgb(238, 238, 238)",
                  }}
                  onClick={handleTheme}
                  className="message-noticee"
                />
              )}
              <Link to={`/profile/${userInfo?._id}`}>
                <div className="header-right-img-div ">
                  <img
                    src={
                      userInfo?.profilePicture
                        ? userInfo?.profilePicture
                        : "/images/ava.png"
                    }
                    className="img-fluid header-right-img"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
