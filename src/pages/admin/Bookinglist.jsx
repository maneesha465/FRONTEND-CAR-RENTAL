import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../config/axiosInstance';
import { BookingCard } from '../../components/ui/Cards';

export const Bookinglist = () => {
  const [bookings, setBookings] = useState([]); // Ensure the initial state is an array

  const fetchBookings = async () => {
    try {
      const response = await axiosInstance({
        url: '/admin/getallbookings',
        method: 'GET',
      });

      console.log('response=====', response);

      // Update based on actual response structure
      setBookings(response?.data?.bookings || []); // Set bookings to an empty array if data is not present
    } catch (error) {
      console.log(error);
      toast.error('Failed fetching bookings');
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="px-20 py-10">
      <div className="grid grid-cols-3 gap-10">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <BookingCard key={booking._id} 
            booking={booking}
             />
          ))
        ) : (
          <p>No bookings found</p>
        )}
      </div>
    </div>
  );
};
