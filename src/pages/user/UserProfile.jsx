import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";

export const UserProfile = () => {
    const [user, setUser] = useState({});

    const fetchUserProfile = async () => {
        try {
            const response = await axiosInstance({
                url: "/user/profile",
                method: "GET",
            });
            setUser(response?.data?.data);
        } catch (error) {
            console.log(error);
            toast.error("error fetching user data");
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    return (
        <div 
            className="flex flex-col gap-5 items-start px-5 md:px-10 lg:px-20 py-10"
            style={{
                backgroundImage: `url('https://icltours.com/img/car/1_large.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "100vh",
            }}
        >
           <div
  className="relative md:absolute transform -translate-y-1/2 p-4 md:p-6 text-white rounded-lg max-w-full md:max-w-md lg:max-w-lg"
  style={{ top: '30%', right: '5%' }}
>
  <h1 className="text-sm md:text-xl lg:text-2xl font-semibold leading-tight">
    How easy it is to book the perfect car for your trips with just a few clicks
    <br />
    <span className="block mt-3 text-xs md:text-lg lg:text-xl">
      The search and filter options make finding exactly what you need 
    </span>
  </h1>
</div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-white">Welcome {user?.name || "User"}</h1>
            <div className="avatar pb-2 pt-4">
                <div className="w-16 md:w-20 lg:w-24 rounded-xl">
                    <img src={user?.profilePic} alt="User profile" />
                </div>
            </div>
            <p className="text-xl md:text-2xl lg:text-3xl text-white">Email: {user?.email || "Not available"}</p>
            <p className="text-lg md:text-xl lg:text-2xl text-white">Phone: {user?.mobile || "Not available"}</p>
        </div>
    );
};
