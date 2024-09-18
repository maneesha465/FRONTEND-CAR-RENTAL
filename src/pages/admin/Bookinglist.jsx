// import React, { useEffect, useState } from 'react';
// import toast from 'react-hot-toast';
// import { axiosInstance } from '../../config/axiosInstance';
// import { BookingCard } from '../../components/ui/Cards';

// export const Bookinglist = () => {
//   const [bookings, setBookings] = useState([]); // Ensure the initial state is an array

//   const fetchBookings = async () => {
//     try {
//       const response = await axiosInstance({
//         url: '/admin/getallbookings',
//         method: 'GET',
//       });

//       console.log('response=====', response);

//       // Update based on actual response structure
//       setBookings(response?.data?.bookings || []); // Set bookings to an empty array if data is not present
//     } catch (error) {
//       console.log(error);
//       toast.error('Failed fetching bookings');
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   return (
//     <div className="px-20 py-10">
//       <div className="grid grid-cols-3 gap-10">
//         {bookings.length > 0 ? (
//           bookings.map((booking) => (
//             <BookingCard key={booking._id} 
//             booking={booking}
//              />
//           ))
//         ) : (
//           <p>No bookings found</p>
//         )}
//       </div>
//     </div>
//   );
// };



import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

export const Bookinglist = () => {
  const { id } = useParams(); // Get the userId from the URL params
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchUserBookings = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/booking/booking-details/${id}`, { withCredentials: true });
      if (response?.data?.success) {
        setBookings(response.data.data);
      } else {
        toast.error("No bookings found.");
      }
    } catch (error) {
      toast.error("Failed to fetch booking details.");
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchUserBookings();
    }
  }, [id]);

 

  return (
    <div className="container mx-auto mt-10 p-10">
      <h2 className="text-3xl font-bold text-center mb-8">My Bookings</h2>
      
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : bookings.length === 0 ? (
        <p className="text-center text-lg">No bookings available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">
                {booking.car.make} {booking.car.model}
              </h3>
              <img
                src={booking.car.image}
                alt={`${booking.car.make} ${booking.car.model}`}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <p><strong>Pickup Date:</strong> {new Date(booking.pickupDate).toLocaleDateString()}</p>
              <p><strong>Drop-off Date:</strong> {new Date(booking.dropOffDate).toLocaleDateString()}</p>
              <p><strong>Total Cost:</strong> ${booking.totalCost.toFixed(2)}</p>
              <p><strong>Status:</strong> {booking.status}</p>

             
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
