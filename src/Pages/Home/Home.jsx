import React from "react";
import "./home.css";
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
import InsertEmoticonRoundedIcon from "@mui/icons-material/InsertEmoticonRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import MoodRoundedIcon from "@mui/icons-material/MoodRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <section className="home-wrapper">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3 sidebar py-4">
              <div>
                <ul className="px-0">
                  <Link to={"/profile"}>
                    <li className="d-flex align-items-center mb-2 gap-3">
                      <img
                        src="/images/user-img.JPG"
                        className="img-fluid sidebar-left-img"
                      />
                      <span>David Odimayo</span>
                    </li>
                  </Link>
                  <li className="d-flex align-items-center mb-3 gap-3">
                    <PeopleRoundedIcon
                      style={{ fontSize: "1.8rem", color: "rgb(25, 154, 177)" }}
                    />
                    <span>Friends</span>
                  </li>
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
                    <MessageRoundedIcon
                      style={{ fontSize: "1.8rem", color: "rgb(25, 154, 177)" }}
                    />
                    <span>Messanger</span>
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

                  <li className="d-flex align-items-center mb-3 gap-3">
                    <KeyboardArrowDownRoundedIcon
                      style={{
                        fontSize: "1.3rem",
                        color: "black",
                        background: " rgb(238, 238, 238)",
                        borderRadius: "50%",
                      }}
                    />
                    <span>See less</span>
                  </li>
                </ul>
                <div className="underline"></div>
                <div className="d-flex align-items-center gap-3 mt-4">
                  <div className="online-dot-container">
                    <img
                      src="/images/friend2.jpg"
                      className="img-fluid profile-friends-img"
                    />
                  </div>
                  <h6>Elon Musk</h6>
                </div>
                <div className="d-flex align-items-center gap-3 mt-4">
                  <div className="online-dot-container">
                    <img
                      src="/images/ney.PNG"
                      className="img-fluid profile-friends-img"
                    />
                  </div>
                  <h6>Neymar Jr</h6>
                </div>
                <div className="d-flex align-items-center gap-3 mt-4">
                  <div className="online-dot-container">
                    <img
                      src="/images/friend2.jpg"
                      className="img-fluid profile-friends-img"
                    />
                    <span></span>
                  </div>
                  <h6>Elon Musk</h6>
                </div>
                <div className="d-flex align-items-center gap-3 mt-4">
                  <div className="online-dot-container">
                    <img
                      src="/images/friend3.jfif"
                      className="img-fluid profile-friends-img"
                    />
                    <span></span>
                  </div>
                  <h6>Tony Elumelu</h6>
                </div>
                <div className="d-flex align-items-center gap-3 mt-4">
                  <div className="online-dot-container">
                    <img src="/images/pius.jpg" className="img-fluid" />
                    <span></span>
                  </div>
                  <h6>Ikeoba pius</h6>
                </div>
              </div>
            </div>
            <div className="col-6 py-4 d-flex flex-column align-items-center">
              <div className="home-container">
                <div className="home-top">
                  <div className="d-flex home-top-item gap-3">
                    <img
                      src="/images/user-img.JPG"
                      className="img-fluid header-right-img"
                    />
                    <input type="text" placeholder="Whats on your mind David" />
                  </div>
                  <div className="d-flex align-items-center justify-content-between px-4">
                    <div className="d-flex align-items-center mb-4 gap-2 home-item-bottom">
                      <VideocamRoundedIcon
                        style={{
                          fontSize: "2rem",
                          color: "red",

                          borderRadius: "50%",
                        }}
                      />
                      <span>Gaming video</span>
                    </div>
                    <div className="d-flex align-items-center mb-4 gap-2 home-item-bottom">
                      <PhotoLibraryRoundedIcon
                        style={{
                          fontSize: "2rem",
                          color: "green",

                          borderRadius: "50%",
                        }}
                      />
                      <span>Photo/Video</span>
                    </div>
                    <div className="d-flex align-items-center mb-4 gap-2 home-item-bottom">
                      <MoodRoundedIcon
                        style={{
                          fontSize: "2rem",
                          color: "rgb(236, 178, 18)",

                          borderRadius: "50%",
                        }}
                      />
                      <span>Feeling/activity</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="home-body ">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex gap-3 align-items-center">
                        <img
                          src="/images/pius.jpg"
                          className="img-fluid sidebar-left-img"
                        />
                        <span>Ikeoba Pius</span>
                        <span>5 mins ago</span>
                      </div>
                      <MoreVertRoundedIcon
                        style={{
                          fontSize: "2rem",
                          color: "black",
                          borderRadius: "50%",
                          cursor: "pointer",
                        }}
                        className="dot-icon"
                      />
                    </div>
                    <h6 className="mb-0 mt-3">Love for all, Hatred for none</h6>
                    <img
                      src="/images/post3.JPG"
                      className="img-fluid w-100 mt-3 imm"
                    />
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
                        <span>125 people liked</span>
                      </div>
                      <span>345 comments</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2 px-5">
                      <div className="d-flex align-items-center  home-post-lcs">
                        <ThumbUpOffAltIcon
                          style={{
                            fontSize: "2rem",
                            color: "black",
                            borderRadius: "50%",
                            //   background: "blue",
                            padding: "3px",
                          }}
                        />
                        <span>Like</span>
                      </div>
                      <div className="d-flex align-items-center  home-post-lcs">
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
                      <div className="d-flex align-items-center home-post-lcs">
                        <ReplyOutlinedIcon
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
                  </div>
                  <div className="home-body mt-3">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex gap-3 align-items-center">
                        <img
                          src="/images/ney.PNG"
                          className="img-fluid sidebar-left-img"
                        />
                        <span>Neymar Jr</span>
                        <span>5 mins ago</span>
                      </div>
                      <MoreVertRoundedIcon
                        style={{
                          fontSize: "2rem",
                          color: "black",
                          borderRadius: "50%",
                          cursor: "pointer",
                        }}
                        className="dot-icon"
                      />
                    </div>
                    <h6 className="mb-0 mt-3">What a great game today </h6>
                    <img
                      src="/images/post2.JPG"
                      className="img-fluid w-100 mt-3 imm"
                    />
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
                        <span>125 people liked</span>
                      </div>
                      <span>345 comments</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2 px-5">
                      <div className="d-flex align-items-center  home-post-lcs">
                        <ThumbUpOffAltIcon
                          style={{
                            fontSize: "2rem",
                            color: "black",
                            borderRadius: "50%",
                            //   background: "blue",
                            padding: "3px",
                          }}
                        />
                        <span>Like</span>
                      </div>
                      <div className="d-flex align-items-center  home-post-lcs">
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
                      <div className="d-flex align-items-center home-post-lcs">
                        <ReplyOutlinedIcon
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
                  </div>
                  <div className="home-body mt-3">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex gap-3 align-items-center">
                        <img
                          src="/images/seid.jpg"
                          className="img-fluid sidebar-left-img"
                        />
                        <span>Ahmed Seidhat</span>
                        <span>5 mins ago</span>
                      </div>
                      <MoreVertRoundedIcon
                        style={{
                          fontSize: "2rem",
                          color: "black",
                          borderRadius: "50%",
                          cursor: "pointer",
                        }}
                        className="dot-icon"
                      />
                    </div>
                    <h6 className="mb-0 mt-3">Love for all, Hatred for none</h6>
                    <img
                      src="/images/post1.PNG"
                      className="img-fluid w-100 mt-3 imm"
                    />
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
                        <span>125 people liked</span>
                      </div>
                      <span>345 comments</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2 px-5">
                      <div className="d-flex align-items-center  home-post-lcs">
                        <ThumbUpOffAltIcon
                          style={{
                            fontSize: "2rem",
                            color: "black",
                            borderRadius: "50%",
                            //   background: "blue",
                            padding: "3px",
                          }}
                        />
                        <span>Like</span>
                      </div>
                      <div className="d-flex align-items-center  home-post-lcs">
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
                      <div className="d-flex align-items-center home-post-lcs">
                        <ReplyOutlinedIcon
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
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3 py-4 home-right">
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
                <div className="d-flex align-items-center gap-3 mt-3">
                  <div className="online-dot-container">
                    <img
                      src="/images/friend3.jfif"
                      className="img-fluid profile-friends-img"
                    />
                    <span></span>
                  </div>
                  <h6>Tony Elumelu</h6>
                </div>
                <div className="d-flex align-items-center gap-3 mt-4">
                  <div className="online-dot-container">
                    <img
                      src="/images/friend1.PNG"
                      className="img-fluid profile-friends-img"
                    />
                    <span></span>
                  </div>
                  <h6>Steve Jobs</h6>
                </div>
                <div className="d-flex align-items-center gap-3 mt-4">
                  <div className="online-dot-container">
                    <img
                      src="/images/ney.PNG"
                      className="img-fluid profile-friends-img"
                    />
                    <span></span>
                  </div>
                  <h6>Neymar Jr</h6>
                </div>
                <div className="d-flex align-items-center gap-3 mt-4">
                  <div className="online-dot-container">
                    <img
                      src="/images/friend2.jpg"
                      className="img-fluid profile-friends-img"
                    />
                    <span></span>
                  </div>
                  <h6>Elon Musk</h6>
                </div>
                <div className="d-flex align-items-center gap-3 mt-4">
                  <div className="online-dot-container">
                    <img src="/images/pius.jpg" className="img-fluid" />
                    <span></span>
                  </div>
                  <h6>Ikeoba pius</h6>
                </div>
                <div className="d-flex align-items-center gap-3 mt-4">
                  <div className="online-dot-container">
                    <img src="/images/user-img.JPG" className="img-fluid" />
                    <span></span>
                  </div>
                  <h6>David Beckham</h6>
                </div>
                <div className="d-flex align-items-center gap-3 mt-4">
                  <div className="online-dot-container">
                    <img
                      src="/images/ney.PNG"
                      className="img-fluid profile-friends-img"
                    />
                    <span></span>
                  </div>
                  <h6>Ikeoba pius</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
