import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

export const Bookinglist = () => {
  const { id } = useParams(); // Get the userId from the URL params
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState({});

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

  const getStepClass = (currentStatus, step) => {
    const statusOrder = ['booked', 'received', 'returned']; // Define the order of statuses
    return statusOrder.indexOf(currentStatus.toLowerCase()) >= statusOrder.indexOf(step.toLowerCase())
      ? 'step step-primary'
      : 'step';
  };

  const handleStatusChange = (bookingId, newStatus) => {
    setSelectedStatus((prevState) => ({
      ...prevState,
      [bookingId]: newStatus,
    }));
  };

  const handleConfirmStatusChange = async (bookingId) => {
    const updatedStatus = selectedStatus[bookingId] || booking.status; // Get the status from selectedStatus or the original status

    try {
      // Send the status update to the backend
      const response = await axiosInstance.put(`/booking/update-status/${bookingId}`, { car_Status: updatedStatus }); // Use car_Status
      if (response?.data?.success) {
        toast.success("Booking status updated successfully!");
        fetchUserBookings(); // Refresh bookings to get the updated status
      } else {
        toast.error("Failed to update booking status.");
      }
    } catch (error) {
      toast.error("Error updating booking status.");
      console.error("Error updating booking status:", error);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-10">
      <h2 className="text-3xl font-bold text-center mb-8">Bookings</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : bookings.length === 0 ? (
        <p className="text-center text-lg">No bookings available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className={`bg-white p-6 rounded-lg shadow-lg ${
                selectedStatus[booking._id] === 'received' || booking.status === 'received'
                  ? 'bg-blue-100'
                  : selectedStatus[booking._id] === 'returned' || booking.status === 'returned'
                  ? 'bg-blue-300'
                  : ''
              }`}
            >
              <h3 className="text-xl font-semibold mb-4">
                {booking.car.make} {booking.car.model}
              </h3>
              <img
                src={booking.car.image}
                alt={`${booking.car.make} ${booking.car.model}`}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <p>
                <strong>Pickup Date:</strong> {new Date(booking.pickupDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Drop-off Date:</strong> {new Date(booking.dropOffDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Total Cost:</strong> ${booking.totalCost.toFixed(2)}
              </p>
              <p>
                <strong>Status:</strong> {booking.status}
              </p>

              {/* Dropdown for status update */}
              <div className="mt-4">
                <label htmlFor={`status-${booking._id}`} className="block mb-2 text-sm font-medium">
                  Update Status:
                </label>
                <select
                  id={`status-${booking._id}`}
                  value={selectedStatus[booking._id] || booking.status}
                  onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                  className="block w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="booked">Booked</option>
                  <option value="received">Received</option>
                  <option value="returned">Returned</option>
                </select>
                <button
                  className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
                  onClick={() => handleConfirmStatusChange(booking._id)}
                >
                  Confirm
                </button>
              </div>

              {/* Stepper */}
              <ul className="steps mt-4 space-x-4">
                <li className={getStepClass(selectedStatus[booking._id] || booking.status, 'booked')}>Booked</li>
                <li className={getStepClass(selectedStatus[booking._id] || booking.status, 'received')}>Received</li>
                <li className={getStepClass(selectedStatus[booking._id] || booking.status, 'returned')}>Returned</li>
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
