import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./Components/scrollToTop";

import Layout from "./Components/Layout";
import { useSelector, useDispatch } from "react-redux";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import Login from "./Pages/Login/Login";
import PrivateRouter from "./PrivateRouter";
import AddFriend from "./Pages/AddFriendPage/AddFriend";
import FriendsProfile from "./Pages/FriendsProfile/FriendsProfile";
import Message from "./Pages/Message/Message";
import io from "socket.io-client";
import Register from "./Pages/Login/Register";
import Bookmarks from "./Pages/Bookmark/Bookmarks";
const App = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, error } = userLogin;
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const auth = window.localStorage.getItem("userInfooo");

  useEffect(() => {
    // Get the socket ID from localStorage if it exists
    const storedSocketId = localStorage.getItem("socketId");
    const socketInstance = storedSocketId
      ? io("http://localhost:5000", { query: { socketId: storedSocketId } })
      : io("http://localhost:5000"); // Replace with your server URL

    // Save the socket ID in localStorage
    localStorage.setItem("socketId", socketInstance.id);

    // Set the socket instance to state
    setSocket(socketInstance);

    // Clean up the socket connection when the user logs out
    return () => {
      // If the user is logged in, do not disconnect the socket
      // This way, the socket connection persists across page refreshes
      if (!auth) {
        socketInstance.disconnect();
      }
    };
  }, [auth]);

  useEffect(() => {
    if (socket) {
      console.log("Socket connected");
      socket.on("connect", () => {
        console.log("A user connected");
      });

      socket.on("disconnect", () => {
        console.log("A user disconnected");
      });
    }
  }, [socket]);

  useEffect(() => {
    if (auth && socket) {
      socket.emit("addUser", userInfo?._id);
      socket.on("getUsers", (users) => {
        console.log(users);
        setOnlineUsers(
          userInfo?.following?.filter((a) => users?.some((u) => u.userId === a))
        );
        console.log(users);
      });
    }
  }, [socket, auth, userInfo?.following]);
  return (
    <>
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={
                  <PrivateRouter>
                    <Home onlineUsers={onlineUsers} />
                  </PrivateRouter>
                }
              />
              <Route
                path="/friends"
                element={
                  <PrivateRouter>
                    <AddFriend />
                  </PrivateRouter>
                }
              />
              <Route
                path="/profile/:id"
                element={
                  <PrivateRouter>
                    <Profile />
                  </PrivateRouter>
                }
              />
              <Route
                path="/friend/:id"
                element={
                  <PrivateRouter>
                    <FriendsProfile />
                  </PrivateRouter>
                }
              />
              <Route
                path="/bookmark"
                element={
                  <PrivateRouter>
                    <Bookmarks />
                  </PrivateRouter>
                }
              />
              <Route
                path="/message?/:id"
                element={
                  <PrivateRouter>
                    <Message
                      socket={socket}
                      onlineUsers={onlineUsers}
                      setOnlineUsers={setOnlineUsers}
                    />
                  </PrivateRouter>
                }
              />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </>
  );
};

export default App;
