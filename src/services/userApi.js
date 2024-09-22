import toast from "react-hot-toast";
import { axiosInstance } from "../config/axiosInstance";


export const userSignup = async (data) => {
    try {
        const response = await axiosInstance({
            url: "/user/signup",
            method: "POST",
            data,
            withCredentials: true,
        });
        return response?.data;
    } catch (error) {
        toast.error("sign-up Success");
        console.log(error);
    }
};

export const userLogin = async (data) => {
    try {
        const response = await axiosInstance({
            url: "/user/login",
            method: "POST",
            data,
            withCredentials: true,
        });
        if (response?.data?.userId) {
            localStorage.setItem('userId', response.data.userId);
        }

        return response?.data;
    } catch (error) {

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
        toast.error("Log-out failed ");
        console.log(error);
    }
};



export const fetchUserProfile = async () => {
    try {
        const response = await axiosInstance({
            url: "/user/profile",
            method: "GET",
            withCredentials: true,
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

export const bookingData = async (data) => {
    try {
        const response = await axiosInstance({
            url: `/booking/create-booking/${id}`,
            method: "POST",
            data,
            withCredentials: true,
        });
        return response?.data;
    } catch (error) {
        toast.error("sign-up Success");
        console.log(error);
    }
};