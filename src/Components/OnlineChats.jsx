import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFriends } from "../Redux/Action/UserAction";
import { CREATE_CONVERSATION_RESET } from "../Redux/Constants/MessageConstants";
import {
  createConversations,
  setCurrentChat,
} from "../Redux/Action/MessageAction";
import { Link, useLocation, useNavigate } from "react-router-dom";
const OnlineChats = ({ onlineUsers, st }) => {
  // Redux state
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const listFriends = useSelector((state) => state.listFriends);
  const { friends, loading: loadingFriends } = listFriends;

  const createConversationss = useSelector(
    (state) => state.createConversationss
  );
  const { friendsConvo, success } = createConversationss;

  const currentChatt = useSelector((state) => state.currentChatt);
  const { currentChat } = currentChatt;

  // Dispatch function
  const dispatch = useDispatch();

  // React Router hook
  const history = useNavigate();

  // State for online friends
  const [onlineFriends, setOnlineFriends] = React.useState([]);

  // Fetch friends when the component mounts
  React.useEffect(() => {
    dispatch(getFriends(userInfo?._id));
  }, [dispatch, userInfo]);

  // Update the onlineFriends state whenever friends or onlineUsers change
  React.useEffect(() => {
    // Assuming you have a separate "onlineUsers" state in your Redux store
    setOnlineFriends(friends?.filter((f) => onlineUsers?.includes(f?._id)));
  }, [friends, onlineUsers]);

  // Function to handle starting a conversation with a friend
  const handleConvo = (senderId, recieverId) => {
    console.log(senderId, recieverId);
    dispatch(createConversations({ senderId, recieverId }));
  };

  // Use the useEffect hook to set friendsConvo as currentChat once it's available
  React.useEffect(() => {
    if (success) {
      dispatch(setCurrentChat(friendsConvo));
      dispatch({ type: CREATE_CONVERSATION_RESET });
      history("/message");
    }
  }, [success]);
  return (
    <>
      {friends?.map((friend) => {
        return (
          <Link
            to={`/friend/${friend?._id}`}
            className={
              st
                ? "d-flex chats-section gap-2 mt-4 mb-4"
                : "d-flex chats-section2 gap-2 mt-4 mb-4"
            }
            // onClick={() => handleConvo(userInfo?._id, friend?._id)}
          >
            <div className="online-stat">
              <div className=" chats-img-div">
                <img
                  src={
                    friend?.profilePicture
                      ? friend?.profilePicture
                      : "/images/ava.png"
                  }
                  className="img-fluid chats-img"
                />
              </div>
              {onlineFriends?.some(
                (onlineFriend) => onlineFriend?._id === friend?._id
              ) && <span className="online-span"></span>}
            </div>
            <b className="mb-0">{friend?.name}</b>
          </Link>
        );
      })}
    </>
  );
};

export default OnlineChats;
