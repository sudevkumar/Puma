import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Secure = ({ children }) => {
  const user = useSelector((state) => state.user.user);

  if (user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default Secure;
