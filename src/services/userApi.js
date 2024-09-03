import toast from "react-hot-toast";
import { axiosInstance } from "../config/axiosInstance";

export const userLogin = async (data) => {
  try {
         const response = await axiosInstance({
             url: "/user/login",
             method: "POST",
             data,
             withCredentials:true,
         });
         return response?.data;
    } catch (error) {
        toast.error("Log-in Success");
        console.log(error);
     }
 };
 export const userLogout = async () => {
     try {
         const response = await axiosInstance({
             url: "/user/logout",
             method: "POST",
         });
         return response?.data;
     } catch (error) {
         toast.error("Log-out Failed ");
         console.log(error);
     }
 };



 export const fetchUserProfile = async () => {
     try {
         const response = await axiosInstance({
             url: "/user/profile",
             method: "GET",
         });

         console.log(response, "====response");

         return response?.data;
     } catch (error) {
         console.log("error fetching user data");
         toast.error("error fetching user data");
     }
 };




 export const checkUser = async () => {
     try {
         const response = await axiosInstance({
             url: "/user/user-check",
             method: "GET",
            // withCredentials:true
         });
        return response?.data;
     } catch (error) {
         console.log(error);
     }
 };