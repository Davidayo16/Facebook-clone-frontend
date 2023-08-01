import React, { useEffect, useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import SendIcon from "@mui/icons-material/Send";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getConversations } from "../../Redux/Action/MessageAction";
import { getUserDetails } from "../../Redux/Action/UserAction";
import io from "socket.io-client";
import { useParams, useLocation } from "react-router-dom";
import OnlineChats from "../../Components/OnlineChats";
import MobileMessage from "../../Components/MobileMessage";
import Messanger from "../../Components/Messanger";
import Conversation from "../../Components/Conversation";
import "./message.css";

const Message = ({ socket, onlineUsers }) => {
  // State for showing/hiding emoji picker
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Toggle the emoji picker
  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  // Redux state and dispatch
  const dispatch = useDispatch();
  const location = useLocation();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, error } = userLogin;

  // Get current message and chat details from Redux store
  const currentMessangerr = useSelector((state) => state.currentMessangerr);
  const { currentMessanger } = currentMessangerr;
  const currentChatt = useSelector((state) => state.currentChatt);
  const { currentChat } = currentChatt;

  // State for managing messages
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Get the user's conversations from the server on component mount
  useEffect(() => {
    dispatch(getConversations(userInfo?._id));
  }, [dispatch]);

  // Retrieve the conversations from the Redux store
  const conversationGet = useSelector((state) => state.conversationGet);
  const { conversations, loading: loadingConversation } = conversationGet;

  // Find the receiver's ID in the current chat
  const recieverId = currentChat?.members?.find(
    (chat) => chat !== userInfo?._id
  );

  // Get user details on component mount and whenever the user ID changes
  useEffect(() => {
    dispatch(getUserDetails(userInfo?._id));
  }, [dispatch, userInfo?._id, userInfo]);

  // Retrieve user details from the Redux store
  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading: loadingDetails } = userDetails;

  // Handle sending a new message
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Replace with your environment variable name
  });
  const handleMessageSend = async (e) => {
    setShowEmojiPicker(false);
    e.preventDefault();
    const messageData = {
      conversationId: currentChat?._id,
      sender: userInfo?._id,
      text: message,
      user: userInfo?._id,
    };

    socket?.emit("sendMessage", {
      senderId: userInfo?._id,
      recieverId,
      text: message,
      user: {
        profilePicture: userInfo?.profilePicture,
      },
    });

    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await api.post("/api/message", messageData, config);
      setMessage("");
      console.log("Message sent:", response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error sending message:", error);
      setLoading(false);
    }
  };

  // Listen for incoming messages from the socket
  useEffect(() => {
    socket?.on("get", (data) => {
      console.log("Received message from server arrival message:", data);
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        user: data.user,
        createdAt: Date.now(),
      });
    });
    console.log("Arrival Message:", arrivalMessage);
  }, [socket]);

  // Update messages when an arrival message is received and the sender is part of the current chat
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members?.includes(arrivalMessage?.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  // Emit a test message to the server on component mount
  useEffect(() => {
    socket?.emit("send", "howfa now my guy");
    socket?.on("get", (data) => {
      console.log("Received message from server:", data);
    });
  }, [socket]);

  const [isMessage, setIsMessage] = useState(false);

  return (
    <>
      <section className="home-wrapper">
        <MobileMessage
          messages={messages}
          setMessages={setMessages}
          currentChatId={currentChat?._id}
          currentMessanger={currentMessanger}
          setMessage={setMessage}
          message={message}
          handleMessageSend={handleMessageSend}
          loading={loading}
          isMessage={isMessage}
          setIsMessage={setIsMessage}
        />
        <div className="container-xxl">
          <div className="row">
            <div className="col-md-3 col-12 py-2 px-2 msg-hed home-rightt">
              <h4>Friends</h4>
              <div className="chat-mainn">
                <OnlineChats onlineUsers={onlineUsers} />
              </div>
            </div>

            <>
              <div className="d-md-flex  msg-cont col-6 d-none">
                {currentChat?._id ? (
                  <>
                    <div className="message-top">
                      <img
                        src={
                          currentMessanger?.img
                            ? currentMessanger?.img
                            : "/images/ava.png"
                        }
                        className="img-fluid top-img"
                      />
                      <div>
                        <h5>{currentMessanger?.name}</h5>
                        <p className="mb-0">friend</p>
                      </div>
                    </div>
                    <div className="i">
                      <Messanger
                        messages={messages}
                        setMessages={setMessages}
                      />
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
                    <h3>Open a conversation to start a chat</h3>
                  </div>
                )}
              </div>
            </>
            <div className="col-md-3 col-12  sidebarr py-4">
              <div>
                <h5 className="msg-hed">Chats</h5>
              </div>
              <div className="chats-input-container">
                <input
                  type="text"
                  placeholder=" Search friends"
                  className="search-friends"
                />
              </div>
              {conversations?.map((convo) => {
                return (
                  <Conversation convo={convo} setIsMessage={setIsMessage} />
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Message;
