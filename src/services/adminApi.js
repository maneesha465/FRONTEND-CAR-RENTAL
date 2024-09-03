import toast from "react-hot-toast";
import { axiosInstance } from "../config/axiosInstance";

export const adminLogin = async (data) => {
  try {
    const response = await axiosInstance({
      url: "/admin/login",
      method: "POST",
      data,
      withCredentials: true,
    });
    return response?.data;
  } catch (error) {
    toast.error("Login Failed");
    console.log(error);
  }
};

export const adminLogout = async () => {
  try {
    const response = await axiosInstance({
      url: "/admin/logout",
      method: "POST",
    });
    return response?.data;
  } catch (error) {
    toast.error("Logout Failed");
    console.log(error);
  }
};

export const fetchAdminProfile = async () => {
  try {
    const response = await axiosInstance({
      url: "/admin/profile",
      method: "GET",
    });

    console.log(response, "====response");

    return response?.data;
  } catch (error) {
    console.log("Error fetching admin data");
    toast.error("Error fetching admin data");
  }
};

export const checkAdmin = async () => {
  try {
    const response = await axiosInstance({
      url: "/admin/admin-check",
      method: "GET",
    });
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
