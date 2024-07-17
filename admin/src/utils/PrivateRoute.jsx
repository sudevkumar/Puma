import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Navigate, useLocation } from "react-router-dom";
import { setUser } from "../Redux/userSlice";

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      const storedUser = JSON.parse(localStorage.getItem("puma-data-admin"));
      if (storedUser) {
        dispatch(setUser(storedUser));
      } else {
        toast.error("You need to log in to access this page");
      }
    } else {
      toast.dismiss();
    }
  }, [user, dispatch]);

  if (user === null) {
    return <Navigate to="/loginpuma" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
