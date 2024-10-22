import { LogOut } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "../../services/userApi";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";

export const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const handleLogOut = async () => {
        const response = await userLogout();
        if (response?.success) {
            navigate("/");
        }
    };

    const fetchUserProfile = async () => {
        try {
            const response = await axiosInstance({
                url: "/user/profile",
                method: "GET",
            });
            console.log(response.data);
            setUser(response?.data?.data);
        } catch (error) {
            console.log(error);
            toast.error("Error fetching user data");
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    // Check if user data is loaded
    if (!user) {
        return <div>Loading...</div>; // Display a loading message while fetching user data
    }

    return (
        <div className="flex flex-col gap-5 items-start px-4 py-10"> {/* Reduced padding here */}
            <div>
                <Link
                    to={`/user/profile`}
                    className="text-black no-underline hover:underline block"
                >
                    View User Profile
                </Link>
            </div>

            <div>
                <Link
                    to={`/user/edit-user/${user._id}`} // Safely access user._id
                    className="text-black no-underline hover:underline block"
                >
                    Edit Profile
                </Link>
            </div>
            
            <div>
                <Link
                    to={`/user/booking-details/${user._id}`} // Safely access user._id
                    className="text-black no-underline hover:underline block"
                >
                    View Bookings
                </Link>
            </div>

            <button onClick={handleLogOut} className="btn btn-error btn-sm flex items-center gap-2 text-black">
                <span>Log-out</span>
                <LogOut />
            </button>
        </div>
    );
};
