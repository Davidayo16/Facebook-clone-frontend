import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";

const Layout = () => {
  return (
    <>
      <Header />

      <Outlet />
    </>
  );
};

export default Layout;
