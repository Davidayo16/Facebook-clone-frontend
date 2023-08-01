import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getFriendConversations,
  setCurrentChat,
} from "../Redux/Action/MessageAction";
import { useEffect, useState } from "react";

import axios from "axios"; // Import axios to make HTTP requests
import { MSG_ACTIVE } from "../Redux/Constants/MessageConstants";
import { setCurrentMessanger } from "./../Redux/Action/MessageAction";

const Conversation = ({ convo, setIsMessage }) => {
  const dispatch = useDispatch();

  const [friendsConversationss, setFriendsConversationss] = useState([]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const currentChatt = useSelector((state) => state.currentChatt);
  const { currentChat } = currentChatt;

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Replace with your environment variable name
  });

  useEffect(() => {
    if (convo && userInfo) {
      const friendIds = convo.members.filter((m) => m !== userInfo._id);
      fetchFriendConversations(friendIds);
    }
  }, [convo, userInfo]);

  const fetchFriendConversations = async (friendIds) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const friendConversations = [];
      for (const friendId of friendIds) {
        const response = await api.get(
          `/api/conversation/?userId=${friendId}`,
          config
        );
        friendConversations.push(response.data);
      }

      setFriendsConversationss(friendConversations);
    } catch (error) {
      console.error(error);
    }
  };
  const handleConvo = (namee, img) => {
    dispatch(setCurrentMessanger({ name: namee, img: img }));
    dispatch(setCurrentChat(convo));
    dispatch({ type: MSG_ACTIVE });
  };

  return (
    <>
      {friendsConversationss?.map((friend) => (
        <div
          className="d-flex chats-section mt-4 mb-4"
          key={friend._id}
          onClick={() => handleConvo(friend?.name, friend?.profilePicture)}
        >
          <img
            src={
              friend?.profilePicture
                ? friend?.profilePicture
                : "/images/ava.png"
            }
            className="img-fluid chats-img"
          />
          <h6>{friend?.name}</h6>
        </div>
      ))}
    </>
  );
};

export default Conversation;
