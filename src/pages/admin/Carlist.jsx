import React, { useEffect, useState } from "react"; 
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";

export const Carlist = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  const fetchCars = async () => {
    try {
      const response = await axiosInstance({
        url: "/car/carlist",
        method: "GET",
      });
      console.log("Fetched cars:", response);
      setCars(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching cars:", error);
      toast.error("Failed fetching cars");
    }
  };

  const handleDelete = async (carId) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        await axiosInstance({
          url: `/car/deletecar/${carId}`,
          method: "DELETE",
        });
        toast.success("Car deleted successfully!");
        fetchCars();
      } catch (error) {
        toast.error("Error deleting car");
        console.error("Error deleting car:", error);
      }
    }
  };

  const handleEdit = (carId) => {
    navigate(`/admin/updatecar/${carId}`);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const ListCard = ({ car, onEdit, onDelete }) => {
    const { make, model, year, pricePerDay, fuelType, availability, seatingCapacity, engine, service, quality, image, _id } = car;

    return (
      <div className="card card-compact bg-base-300 w-full sm:w-80 shadow-xl">
        <figure>
          <img src={image} alt={`${make} ${model}`} className="object-cover w-full h-48"/>
        </figure>
        <div className="card-body">
          <h2 className="card-title">{make} {model}</h2>
          <p className="text-lg">Year: {year}</p>
          <p className="text-lg">Price per day: {pricePerDay}</p>
          <p className="text-lg">Fuel Type: {fuelType}</p>
          <p className="text-lg">Seating Capacity: {seatingCapacity}</p>
          <p className="text-lg">Engine: {engine}</p>
          <p className="text-lg">Service: {service}</p>
          <p className="text-lg">Quality: {quality}</p>

          <p className={`text-sm ${availability ? 'text-green-500' : 'text-red-500'}`}>
            {availability ? 'Available' : 'Not Available'}
          </p>

          <div className="card-actions justify-end">
            <button onClick={() => onEdit(_id)} className="btn btn-secondary mx-2">Edit</button>
            <button onClick={() => onDelete(_id)} className="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="px-4 md:px-10 lg:px-20 py-10">
      <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl my-5 text-center">List of Cars</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8 lg:gap-10">
        {cars.length > 0 ? (
          cars.map((car) => (
            <ListCard
              key={car._id}
              car={car}
              onEdit={() => handleEdit(car._id)}
              onDelete={() => handleDelete(car._id)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No cars available</p>
        )}
      </div>
    </div>
  );
};
