import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { CarCard } from "../../components/ui/Cards";

export const CarPage = () => {
  const [cars, setCars] = useState([]);  // Store fetched cars
  const [searchQuery, setSearchQuery] = useState("");  // Store search input
  const [loading, setLoading] = useState(false);  // Loading state

  // Fetch cars based on the search query
  const fetchCars = async (query = "") => {
    setLoading(true);
    try {
      // If there's a search query, use the search API endpoint
      const response = await axiosInstance({
        url: query ? `/car/search?make=${query}` : "/car/carlist",
        method: "GET",
      });

      console.log("response=====", response);
      setCars(response?.data?.data || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed fetching cars");
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetching cars when component mounts
  useEffect(() => {
    fetchCars();
  }, []);

  // Handle form submission for searching
  const handleSearch = (e) => {
    e.preventDefault();
    fetchCars(searchQuery);  // Fetch cars based on search input
  };

  return (
    <div className="px-4 sm:px-10 md:px-20 py-10">
      {/* Search bar */}
      <form onSubmit={handleSearch} className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by car make..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full sm:w-1/2"
        />
        <button
          type="submit"
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {/* Cars grid */}
      {loading ? (
        <div className="text-center">Loading cars...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cars.length > 0 ? (
            cars.map((car) => (
              <CarCard key={car._id} car={car} />
            ))
          ) : (
            <div className="col-span-3 text-center">No cars found.</div>
          )}
        </div>
      )}
    </div>
  );
};
