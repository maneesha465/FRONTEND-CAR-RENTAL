import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';

export const SuccessPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [booking, setBooking] = useState({});
  const [carDetails, setCarDetails] = useState({});

  const formatDate = (dateString) => {
    if (!dateString) return "Not available";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // Formats to DD-MM-YYYY
  };

  const fetchUserProfile = async () => {
    try {
      const response = await axiosInstance.get('/user/profile');
      setUser(response?.data?.data);
    } catch (error) {
      toast.error("Error fetching user data");
      console.error(error);
    }
  };

  const fetchBookingDetails = async () => {
    try {
      const response = await axiosInstance.get('/booking/latest');
      const bookingData = response?.data?.data || {};
      setBooking(bookingData);
      
      if (bookingData.car) {
        fetchCarDetails(bookingData.car);
      }
    } catch (error) {
      toast.error("Error fetching booking details");
      console.error(error);
    }
  };

  const fetchCarDetails = async (carId) => {
    try {
      const response = await axiosInstance.get(`/car/car-details/${carId}`);
      setCarDetails(response?.data?.data || {});
    } catch (error) {
      toast.error("Error fetching car details");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchBookingDetails();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <div style={{ fontSize: '24px', color: 'green', fontWeight: 'bold' }}>
        Booking created successfully!
      </div>
      <h5 className='font-bold mt-4'>User Details</h5>
      <p className='mt-2'>Name: {user?.name || "User"}</p>
      <p>Email: {user?.email || "Not available"}</p>
      <p>Phone: {user?.mobile || "Not available"}</p>
      
      <h5 className='font-bold mt-4'>Booking Details</h5>
      <p className='mt-2'>Pickup Date: {formatDate(booking?.pickupDate)}</p>
      <p>Drop-off Date: {formatDate(booking?.dropOffDate)}</p>
      <p>Total Cost: ₹{booking?.totalCost || "Not available"}</p>

      <h5 className='font-bold mt-4'>Car Details</h5>
      <p className='mt-2'>Car: {carDetails?.make} {carDetails?.model || "Not available"}</p>
      <p>Seating Capacity: {carDetails?.seatingCapacity || "Not available"}</p>
      <p>Fuel Type: {carDetails?.fuelType || "Not available"}</p>

      <button 
        onClick={() => navigate('/user/home')} 
        style={{ 
          marginTop: '20px', 
          padding: '10px 20px', 
          fontSize: '16px', 
          backgroundColor: '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Go to Home
      </button>
    </div>
  );
};
