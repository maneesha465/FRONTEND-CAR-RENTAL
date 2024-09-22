











 import React, { useEffect, useState } from "react";
 import toast from "react-hot-toast";
 import { axiosInstance } from "../../config/axiosInstance";
 import { CarCard } from "../../components/ui/Cards";
 import debounce from "lodash.debounce"; // Debounce utility for optimization

 export const CarPage = () => {
   const [cars, setCars] = useState([]);  // Store fetched cars
   const [searchQuery, setSearchQuery] = useState("");  // Store search input
   const [suggestions, setSuggestions] = useState([]);  // Store search suggestions
   const [loading, setLoading] = useState(false);  // Loading state
   const [showSuggestions, setShowSuggestions] = useState(false); // Toggle suggestions dropdown

   // Fetch cars based on the search query
   const fetchCars = async (query = "") => {
     setLoading(true);
     try {
       // If there's a search query, use the search API endpoint
      const response = await axiosInstance({
        url: query ? `/car/search?make=${query}` : "/car/carlist",
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

   // Fetch suggestions based on the typed input (debounced)
   const fetchSuggestions = debounce(async (query) => {
     if (query) {
       try {
         const response = await axiosInstance({
           url: `/car/search?make=${query}`,
           method: "GET",
         });




  // Get all cars and filter them by unique 'make'
  const uniqueSuggestions = Array.from(
   new Set(response?.data?.data.map((car) => car.make))
 ).map((make) => {
   return response.data.data.find((car) => car.make === make);
 });
 setSuggestions(uniqueSuggestions || []);  // Store unique suggestions
 } catch (error) {
   console.log(error);
   toast.error("Failed fetching suggestions");
 }
 } else {
 setSuggestions([]);
 }
 }, 300); // Delay by 300ms





   //       setSuggestions(response?.data?.data || []);
   //     } catch (error) {
   //       console.log(error);
   //       toast.error("Failed fetching suggestions");
   //     }
   //   } else {
   //     setSuggestions([]);
   //   }
   // }, 300); // Delay by 300ms

   // Trigger fetching cars when component mounts
   useEffect(() => {
     fetchCars();
   }, []);

   // Handle input change for search
   const handleSearchInputChange = (e) => {
     const query = e.target.value;
     setSearchQuery(query);
     setShowSuggestions(true); // Show suggestions while typing
     fetchSuggestions(query);  // Fetch suggestions as user types
   };

   // Handle form submission for searching
   const handleSearch = (e) => {
     e.preventDefault();
     fetchCars(searchQuery);  // Fetch cars based on search input
     setShowSuggestions(false);  // Hide suggestions after searching
   };

   // Handle suggestion click
   const handleSuggestionClick = (suggestion) => {
     setSearchQuery(suggestion.make);  // Set the clicked suggestion in the input
     setShowSuggestions(false);        // Hide suggestions
     fetchCars(suggestion.make);       // Fetch cars based on the selected suggestion
   };

   return (
     <div className="max-w-screen-xl mx-auto px-4 sm:px-10 md:px-20 py-10">
       {/* Search bar */}
       <form onSubmit={handleSearch} className="mb-6 flex flex-col sm:flex-row justify-center">
         <div className="relative w-full sm:w-1/2">
           <input
             type="text"
             placeholder="Search by car make..."
             value={searchQuery}
             onChange={handleSearchInputChange}
             className="border border-gray-300 rounded-md p-2 w-full"
           />
           {showSuggestions && suggestions.length > 0 && (
             <ul className="absolute z-10 bg-white border border-gray-300 w-full max-h-40 overflow-auto rounded-md shadow-lg mt-1">
               {suggestions.map((suggestion) => (
                 <li
                   key={suggestion._id}
                   onClick={() => handleSuggestionClick(suggestion)}
                   className="p-2 hover:bg-gray-100 cursor-pointer"
                 >
                   {suggestion.make}
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

       {/* Cars grid */}
       {loading ? (
         <div className="text-center">Loading cars...</div>
       ) : (
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
           {cars.length > 0 ? (
             cars.map((car) => (
               <CarCard key={car._id} car={car} />
             ))
           ) : (
             <div className="col-span-full text-center">No cars found.</div>
           )}
         </div>
       )}
     </div>
   );
 };

