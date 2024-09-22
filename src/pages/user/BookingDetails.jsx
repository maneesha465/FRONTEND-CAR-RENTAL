import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

export const BookingDetails = () => {
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

  const handleRateExperience = (carId) => {
    if (carId) {
      navigate(`/user/reviews/${carId}`);
    } else {
      console.error('carId is undefined');
    }
  };

  // Handle booking cancellation
  const handleCancelBooking = async (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        const response = await axiosInstance.put(`/booking/cancelbooking/${bookingId}`, {}, { withCredentials: true });
        if (response?.data?.success) {
          toast.success("Booking cancelled successfully.");
          fetchUserBookings(); // Refresh bookings after cancellation
        } else {
          toast.error("Failed to cancel booking.");
        }
      } catch (error) {
        toast.error("Error cancelling booking.");
        console.error("Error cancelling booking:", error);
      }
    }
  };

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

              {/* Buttons for Review and Cancel */}
              <div className="card-actions justify-end mt-4">
                <button
                  onClick={() => handleRateExperience(booking.car._id)}
                  className="btn btn-ghost"
                >
                  Review your Experience
                </button>
                
                {booking.status !== "cancelled" && (
                  <button
                    onClick={() => handleCancelBooking(booking._id)}
                    className="btn btn-danger"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
