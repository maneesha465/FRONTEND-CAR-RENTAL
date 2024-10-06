import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { CarCard } from "../../components/ui/Cards";
import debounce from "lodash.debounce";


const mockSuggestions = [
  // { make: "Toyota", model: "Camry" },
  { make: "Toyota", model: "Corolla" },
  { make: "Honda", model: "Civic" },
  // { make: "Ford", model: "Focus" },
  // { make: "Chevrolet", model: "Malibu" },
  { make: "Chevrolet", model: "Camaro" },
  { make: "Nissan", model: "Altima" },
  { make: "Tesla", model: "Model 3" },
  { make: "BMW", model: "X5" },
  { make: "Audi", model: "A6" },
  { make: "Ford", model: "Mustang" },
  { make: "Mercedes-Benz", model: "C-Class" },
  { make: "Hyundai", model: "Elantra" },
  { make: "Volkswagen", model: "Passat" },
  { make: "Volkswagen", model: "xyc" },
  { make: "BMW", model: "Civic" },
  // Add more makes and models as needed
];

export const CarPage = () => {
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchCars = async (make = "", model = "") => {
    setLoading(true);
    try {
      const response = await axiosInstance({
        url: make || model ? `/car/search?make=${make}&model=${model}` : "/car/carlist",
        method: "GET",
      });
      setCars(response?.data?.data || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed fetching cars");
    } finally {
      setLoading(false);
    }
  };

  const fetchSuggestions = debounce((query) => {
    if (query) {
      const queryParts = query.split(" ").map(part => part.trim());
      const filteredSuggestions = mockSuggestions.filter(suggestion => {
        return queryParts.every(part => 
          suggestion.make.toLowerCase().includes(part.toLowerCase()) ||
          suggestion.model.toLowerCase().includes(part.toLowerCase())
        );
      });
      setSuggestions(filteredSuggestions);
      setShowSuggestions(filteredSuggestions.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, 300);

  useEffect(() => {
    fetchCars();
  }, []);

  

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query === "") {
      fetchCars();
      setShowSuggestions(false);
    } else {
      fetchSuggestions(query);
    }
  };

 // Handle form submission for searching
const handleSearch = (e) => {
  e.preventDefault();
  const queryParts = searchQuery.split(" ").map((item) => item.trim());
  
  // Assume the first part is make and the rest is the model
  const make = queryParts[0];
  const model = queryParts.slice(1).join(" "); // Join the rest as model
  
  fetchCars(make, model); // Pass make and model to fetchCars
  setShowSuggestions(false); // Hide suggestions after searching
};


  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(`${suggestion.make} ${suggestion.model}`);
    setShowSuggestions(false);
    fetchCars(suggestion.make, suggestion.model);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-10 md:px-20 py-10">
      <form onSubmit={handleSearch} className="mb-6 flex flex-col sm:flex-row justify-center">
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            placeholder="Search by make, model..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          {showSuggestions && suggestions.length > 0 && searchQuery && (
            <ul className="absolute z-10 bg-white border border-gray-300 w-full max-h-40 overflow-auto rounded-md shadow-lg mt-1">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {suggestion.make} {suggestion.model}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          type="submit"
          className="sm:ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {loading ? (
        <div className="text-center">Loading cars...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cars.length > 0 ? (
            cars.map((car) => <CarCard key={car._id} car={car} />)
          ) : (
            <div className="col-span-full text-center">No cars found.</div>
          )}
        </div>
      )}
    </div>
  );
};
