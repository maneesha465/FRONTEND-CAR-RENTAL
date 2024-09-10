import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { ListCard } from "../../components/ui/Cards"; // Assuming ListCard is the right component for admin
import { useNavigate } from "react-router-dom";

export const Carlist = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  // Fetch cars from the API
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

  // Handle car deletion
  const handleDelete = async (carId) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        await axiosInstance({
          url: `/car/deletecar/${carId}`,
          method: "DELETE",
        });
        toast.success("Car deleted successfully!");
        // Refetch the list after deletion
        fetchCars();
      } catch (error) {
        toast.error("Error deleting car");
        console.error("Error deleting car:", error);
      }
    }
  };

  // Navigate to edit page
  const handleEdit = (carId) => {
    navigate(`/admin/updatecar/${carId}`);
    // Implement navigation to edit page, e.g., using `navigate` from `react-router-dom`
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="px-20 py-10">
      <h1 className="font-bold text-4xl my-5">List of Cars</h1>
      <div className="grid grid-cols-3 gap-10">
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
          <p className="text-center text-gray-500">No cars available</p>
        )}
      </div>
    </div>
  );
};
