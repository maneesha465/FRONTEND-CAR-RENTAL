

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
//import { useDispatch, useSelector } from "react-redux";

export const CardetailsPage = () => {
     const [carDetails, setCarDetails] = useState({});
     const { id } = useParams();
     const navigate = useNavigate(); 

    // const { car } = useSelector((state) => state.car);

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

     



     useEffect(() => {
         fetchCarDetails();
     }, [id]);

     const handleBookNow = () => {
        navigate(`/user/create-booking/${id}`); // Adjust the route as needed
    };
     

     return (
        <div className="flex justify-center items-center min-h-screen ">
            <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-5xl">
                
                {/* Left Side: Car Details */}

                <div className="w-full md:w-1/2">
                    <img
                        src={carDetails?.image}
                        alt={`${carDetails?.make} ${carDetails?.model}`}
                        className="object-cover w-full h-full"
                    />
                </div>
 {/* Right Side: Car Image */}
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
        </div>
    );
};