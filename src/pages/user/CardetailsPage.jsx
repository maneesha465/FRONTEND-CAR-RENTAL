import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

export const CardetailsPage = () => {
    const [carDetails, setCarDetails] = useState({});
    const [reviews, setReviews] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchCarDetails = async () => {
        try {
            const response = await axiosInstance({
                url: `/car/car-details/${id}`,
                method: "GET",
            });
            setCarDetails(response?.data?.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Fetch reviews for the car
    const fetchReviews = async () => {
        try {
            const response = await axiosInstance({
                url: `/review/reviews/${id}`, // Adjust API endpoint as per your backend
                method: "GET",
            });
            setReviews(response?.data?.reviews);
        } catch (error) {
            console.log("Failed to fetch reviews:", error);
        }
    };

    useEffect(() => {
        fetchCarDetails();
        fetchReviews(); // Fetch reviews when the component mounts
    }, [id]);

    const handleBookNow = () => {
        navigate(`/user/create-booking/${id}`); // Adjust the route as needed
    };


    const renderStars = (rating) => {
        const totalStars = 5;
        const fullStars = Math.floor(rating); // full stars
        const emptyStars = totalStars - fullStars; // empty stars
        return (
            <div className="flex">
                {[...Array(fullStars)].map((_, index) => (
                    <span key={index} className="text-yellow-500 text-xl">★</span>
                ))}
                {[...Array(emptyStars)].map((_, index) => (
                    <span key={index} className="text-gray-400 text-xl">☆</span>
                ))}
            </div>
        );
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen space-y-10">
            {/* Car Details Section */}
            <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-5xl">
                {/* Left Side: Car Image */}
                <div className="w-full md:w-1/2">
                    <img
                        src={carDetails?.image}
                        alt={`${carDetails?.make} ${carDetails?.model}`}
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Right Side: Car Details */}
                <div className="w-full md:w-1/2 p-8">
                    <h1 className="text-3xl font-bold mb-4 text-gray-800">
                        {carDetails?.make} {carDetails?.model}
                    </h1>
                    <ul className="mb-6">
                        <li className="text-gray-600 mb-2">
                            <span className="font-semibold">Year:</span> {carDetails?.year}
                        </li>
                        <li className="text-gray-600 mb-2">
                            <span className="font-semibold">Price per day:</span> {carDetails?.pricePerDay}
                        </li>
                        <li className="text-gray-600 mb-2">
                            <span className="font-semibold">Fuel Type:</span> {carDetails?.fuelType}
                        </li>
                        <li className="text-gray-600 mb-2">
                            <span className="font-semibold">Seating Capacity:</span> {carDetails?.seatingCapacity}
                        </li>
                        <li className="text-gray-600 mb-2">
                            <span className="font-semibold">Engine Performance:</span> {carDetails?.engine}
                        </li>
                        <li className="text-gray-600 mb-2">
                            <span className="font-semibold">Service Experience:</span> {carDetails?.service}
                        </li>
                        <li className="text-gray-600 mb-2">
                            <span className="font-semibold">Ride Quality:</span> {carDetails?.quality}
                        </li>
                        <li className="text-gray-600 mb-2">
                            <span className="font-semibold">Status:</span>{" "}
                            <span className={carDetails?.availability ? "text-green-500" : "text-red-500"}>
                                {carDetails?.availability ? "Available" : "Not Available"}
                            </span>
                        </li>
                    </ul>

                    <button
                        onClick={handleBookNow}
                        className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-300"
                    >
                        Book Now
                    </button>
                </div>
            </div>

            {/* Reviews Section  */}
            <div className="max-w-5xl w-full bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
                {reviews.length > 0 ? (
                    <ul>
                        {reviews.map((review, index) => (
                            <li key={index} className="border-b border-gray-300 pb-4 mb-4">
                                 {/* Display username */}
                                 <div className="flex items-center mb-2">
                                    {/* <span className="font-semibold">Username:</span> */}
                                    <span className="ml-2 text-gray-700">{review.user.name}</span>
                                </div>
                                <div className="flex items-center mb-2">
                                    <span className="font-semibold">Rating:</span>
                                    <span className="ml-2">{renderStars(review.rating)}</span>
                                </div>
                                <p className="text-gray-600">{review.comment}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">No reviews yet. Be the first to review!</p>
                )}
            </div>
        </div>
    );
};
