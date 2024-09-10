
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { CarCard } from "../../components/ui/Cards";

export const CarPage = () => {
const [car,setcars] =useState([])

  const fetchcars = async () => {
    try {
      const response = await axiosInstance({
        url: "/car/carlist",
        method: "GET",
      });
      
      console.log("response=====", response);
      setcars(response?.data?.data);
    } catch (error) {
      console.log(error);
      toast.error("failed fetching products");
    }
  };

  useEffect(() => {
    fetchcars();
  }, []);

  return (
    <div className="px-20  py-10">
      {/* <h1 className="font-bold text-4xl my-5">List of cars</h1> */}
      <div className="grid grid-cols-3 gap-10">
        {
          car.map((value) => (
            <CarCard key={value._id} car={value} />
          )
          )
        }
      </div>
    </div>
  );

};