"use client";

import React, { useContext } from "react";
import Header from "../app/header";
import { Context } from "./Clients";

const MainLayout = ({ children }) => {
  const { user } = useContext(Context);

  return (
    <>
      {user._id ? <Header /> : null}
      {children}
    </>
  );
};

export default MainLayout;
