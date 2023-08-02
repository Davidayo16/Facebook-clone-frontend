import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { MSG_NOT_ACTIVE } from "../Redux/Constants/MessageConstants";
const Messanger = ({ messages, setMessages }) => {
  const [loading, setLoading] = useState(true); // Initialize loading state to true
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const currentChatt = useSelector((state) => state.currentChatt);
  const { currentChat } = currentChatt;
  const dispatch = useDispatch();
  const history = useNavigate();

  const openMsg = useSelector((state) => state.openMsg);
  const { isMsgActive } = openMsg;

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

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Replace with your environment variable name
  });

  useEffect(() => {
    const fetchMessagesData = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const response = await api.get(
          `/api/message/${currentChat?._id}`,
          config
        );
        setMessages(response.data);
        setLoading(false); // Set loading to false once messages are fetched
      } catch (error) {
        console.error("Error fetching messages:", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchMessagesData();
  }, [dispatch, currentChat, window.location.pathname]);
  const mess = React.useRef(null);

  React.useEffect(() => {
    mess?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      dispatch({ type: MSG_NOT_ACTIVE }); // Close the modal

      if (mess.current) {
        mess.current.scrollIntoView({ behavior: "smooth" });
      }
    };

    if (isMsgActive) {
      window.history.pushState(null, null, window.location.href);

      window.addEventListener("popstate", handleBackButton);
    }

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [dispatch, isMsgActive]);

  // Render loading state if messages are being fetched

  return (
    <div className="message">
      {messages.map((msg) => {
        return (
          <div
            className={
              msg?.sender === userInfo?._id
                ? "own messanger d-flex"
                : "messanger d-flex"
            }
            ref={mess}
          >
            <img
              src={
                msg?.user?.profilePicture
                  ? msg?.user?.profilePicture
                  : "/images/ava.png"
              }
              className="img-fluid messanger-img"
            />
            <div className="message-right ">
              <p className="message-text">{msg?.text}</p>
              <div className="message-date">
                <small>{formatTimeAgo(msg?.createdAt)}</small>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Messanger;
