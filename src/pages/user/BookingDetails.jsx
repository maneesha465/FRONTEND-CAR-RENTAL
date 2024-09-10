import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { useParams } from "react-router-dom";
import { BookingCard } from "../../components/ui/Cards";

export const BookingDetails = () => {
  const [bookings, setBookings] = useState([]);
  const [carDetails, setCarDetails] = useState({});
  const { id } = useParams(); // This should be userId

  const fetchCarDetails = async (carId) => {
    try {
      const response = await axiosInstance({
        url: `/car/car-details/${carId}`,
        method: "GET",
      });
      setCarDetails((prevDetails) => ({
        ...prevDetails,
        [carId]: response.data.data,
      }));
    } catch (error) {
      console.error("Error fetching car details:", error);
      toast.error("Error fetching car details");
    }
  };

  const fetchUserBookings = async () => {
    try {
      const response = await axiosInstance({
        url: `/booking/booking-details/${id}`,
        method: "GET",
      });
      const bookingsData = response?.data?.data;

      bookingsData.forEach(async (booking) => {
        if (!carDetails[booking.car]) {
          await fetchCarDetails(booking.car);
        }
      });

      setBookings(bookingsData);
    } catch (error) {
      console.error("Error fetching user bookings:", error);
      toast.error("Error fetching user bookings");
    }
  };

  useEffect(() => {
    if (id) {
      fetchUserBookings();
    }
  }, [id]);

  return (
    <div className="px-20 py-10">
      <h1 className="font-bold text-4xl my-5">Your Bookings</h1>
      <div className="grid grid-cols-3 gap-10">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <BookingCard
              key={booking._id}
              booking={booking}
              car={carDetails[booking.car]}
            />
          ))
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  );
};
