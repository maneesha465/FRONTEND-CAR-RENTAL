

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
//import { useDispatch, useSelector } from "react-redux";

export const CardetailsPage = () => {
     const [carDetails, setCarDetails] = useState({});
     const { id } = useParams();

    // const { car } = useSelector((state) => state.car);

     const fetchCarDetails = async () => {
         try {
             const response = await axiosInstance({
                 url: `/car/cardetails/${id}`,
                 method: "GET",
            });
             setCarDetails(response?.data?.data);
         } catch (error) {
            console.log(error);
         }
     };

     console.log("carDetails====", carDetails);



     useEffect(() => {
         fetchCarDetails();
     }, []);

    return (
         <>
             <div className="flex w-full">
                 <div className="w-4/12">
                     <img src={carDetails?.image} alt="car-details" />
                 </div>
                 <div className="w-8/12">
                     <h1 className="font-bold text-4xl">{carDetails?.make}</h1>
                 </div>
             </div>
             
         </>
    );
};