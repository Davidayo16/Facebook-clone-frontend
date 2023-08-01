import SendIcon from "@mui/icons-material/Send";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { MSG_NOT_ACTIVE } from "../Redux/Constants/MessageConstants";
import { getUserDetails } from "../Redux/Action/UserAction";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
const MobileMessage = ({
  currentChatId,
  // currentMessanger,
  setMessages,
  messages,
  setMessage,
  handleMessageSend,
  setIsMessage,
  isMessage,
  message,
}) => {
  const [loading, setLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const currentChatt = useSelector((state) => state.currentChatt);
  const { currentChat } = currentChatt;
  const currentMessangerr = useSelector((state) => state.currentMessangerr);
  const { currentMessanger } = currentMessangerr;
  const openMsg = useSelector((state) => state.openMsg);
  const { isMsgActive } = openMsg;
  const dispatch = useDispatch();

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
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

  React.useEffect(() => {
    dispatch(getUserDetails(userInfo?._id));
  }, [dispatch, userInfo?._id, userInfo]);
  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading: loadingDetails } = userDetails;

  const recieverId = currentChat?.members?.find(
    (chat) => chat !== userInfo?._id
  );
  const com = React.useRef(null);
  React.useEffect(() => {
    if (com.current) {
      com.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [com, messages, currentChat]);

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Replace with your environment variable name
  });

  useEffect(() => {
    const fetchMessagesData = async () => {
      try {
        setLoading(true);
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const response = await api.get(`/api/message/${currentChatId}`, config);

        setMessages(response.data);
        setLoading(false); // Set loading to false once messages are fetched
      } catch (error) {
        console.error("Error fetching messages:", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchMessagesData();
  }, [dispatch, currentChat, window.location.pathname]);

  return (
    <div className={isMsgActive ? "show msg-wrapper" : "msg-wrapper"}>
      <div className="msg-main">
        {currentChatId ? (
          <>
            <div className="message-topp">
              {loading ? (
                <Skeleton
                  width={50}
                  height={50}
                  circle={true}
                  className="img-fluid top-imgg"
                />
              ) : (
                <img
                  src={
                    currentMessanger?.img
                      ? currentMessanger?.img
                      : "/images/ava.png"
                  }
                  className="img-fluid top-imgg"
                />
              )}
              <div>
                <h5>{currentMessanger?.name || <Skeleton />}</h5>
                {loading ? <Skeleton /> : <b className="mb-0">friend</b>}
              </div>
              <button
                className="btn mb-0"
                onClick={() => dispatch({ type: MSG_NOT_ACTIVE })}
              >
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
              </button>
            </div>
            <div className="i">
              <div className="message">
                {messages.map((msg, index) => {
                  return (
                    <div
                      className={
                        msg?.sender === userInfo?._id
                          ? "own messanger d-flex"
                          : "messanger d-flex"
                      }
                      ref={com}
                    >
                      {msg?.sender !== userInfo?._id ? (
                        <>
                          {loading ? (
                            <Skeleton
                              className="img-fluid messanger-img"
                              width={20}
                              height={20}
                              circle={true}
                            />
                          ) : (
                            <img
                              src={
                                msg?.user?.profilePicture
                                  ? msg?.user?.profilePicture
                                  : "/images/ava.png"
                              }
                              className="img-fluid messanger-img"
                            />
                          )}
                          <div className="message-right ">
                            {loading ? (
                              <Skeleton
                                className="message-text"
                                width={160}
                                height={20}
                              />
                            ) : (
                              <p className="message-text">{msg?.text}</p>
                            )}
                            <div className="message-date">
                              {loading ? (
                                <Skeleton />
                              ) : (
                                <small>{formatTimeAgo(msg?.createdAt)}</small>
                              )}
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="message-right ">
                            {loading ? (
                              <Skeleton className="message-text" />
                            ) : (
                              <p className="message-text">{msg?.text}</p>
                            )}
                            <div className="message-date">
                              {loading ? (
                                <Skeleton />
                              ) : (
                                <small>{formatTimeAgo(msg?.createdAt)}</small>
                              )}
                            </div>
                          </div>
                          {loading ? (
                            <Skeleton
                              className="img-fluid messanger-img"
                              width={20}
                              height={20}
                              circle={true}
                            />
                          ) : (
                            <img
                              src={
                                msg?.user?.profilePicture
                                  ? msg?.user?.profilePicture
                                  : "/images/ava.png"
                              }
                              className="img-fluid messanger-img"
                            />
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {(user?.user?.followers.includes(recieverId) ||
              user?.user?.following.includes(recieverId)) && (
              <form
                onSubmit={(e) => handleMessageSend(e)}
                className="message-footerr"
              >
                <div className="d-flex flex-column w-100">
                  {showEmojiPicker && (
                    <Picker
                      onEmojiSelect={(emoji) =>
                        setMessage((prev) => prev + emoji.native)
                      }
                      set="apple"
                      style={{
                        position: "absolute",
                        bottom: "80px",
                        right: "10px",
                        zIndex: 1,
                      }}
                    />
                  )}
                  <div className="d-flex position-relative align-items-center">
                    <textarea
                      type="text"
                      placeholder="Message"
                      className="send-msg-input"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={toggleEmojiPicker}
                      className="pic-btn"
                    >
                      😄
                    </button>

                    <button
                      className="send-btn"
                      type="submit"
                      disabled={loading || message.trim() === ""}
                      style={{
                        cursor:
                          loading || message.trim() === ""
                            ? "not-allowed"
                            : "pointer",
                      }}
                    >
                      <SendIcon />
                    </button>
                  </div>
                </div>
              </form>
            )}
          </>
        ) : (
          <div className="no-chat">
            <h2>Open a coversation to start a chat</h2>
            <button
              className="btn mb-0"
              onClick={() => dispatch({ type: MSG_NOT_ACTIVE })}
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMessage;
