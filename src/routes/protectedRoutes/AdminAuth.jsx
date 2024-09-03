import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";

export const AdminAuth = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [Admin, setAdmin] = useState(false);

  const checkAdmin = async () => {
    try {
      const response = await axiosInstance({
        url:"/admin/check-admin", 
        method: "GET",
        withCredentials: true,
      });

      setAdmin(true);
      console.log(response, ".....response");
    } catch (error) {
      navigate("/admin-login");
      console.log(error);
    }
  };

  useEffect(() => {
    checkAdmin();
  }, [location.pathname]);

  return Admin ? children : null;
};
