import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { CarCard } from "../../components/ui/Cards";

export const CarPage = () => {
  const [car, setCars] = useState([]);

  const fetchCars = async () => {
    try {
      const response = await axiosInstance({
        url: "/car/carlist",
        method: "GET",
      });

      console.log("response=====", response);
      setCars(response?.data?.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed fetching cars");
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="px-4 sm:px-10 md:px-20 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {car.map((value) => (
          <CarCard key={value._id} car={value} />
        ))}
      </div>
    </div>
  );
};
