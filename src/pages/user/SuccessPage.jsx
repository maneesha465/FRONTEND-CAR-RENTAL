// import React, { useEffect, useState } from 'react';
// import { axiosInstance } from '../../config/axiosInstance';
// import { useParams } from 'react-router-dom'; // <-- Import useParams
// import toast from 'react-hot-toast';

// export const SuccessPage = () => {
//   const [username, setUsername] = useState('');
//   const [bookingDetails, setBookingDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
  
//   const { id } = useParams(); // <-- Extract id from URL

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axiosInstance.get('/user/profile', { withCredentials: true });
//         setUsername(response.data.data.name);
//       } catch (error) {
//         setError('Failed to fetch user data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, []);

//   useEffect(() => {
//     const fetchUserBookings = async () => {
//       if (!id) return;

//       setLoading(true);
//       try {
//         const response = await axiosInstance.get(`/booking/booking-details/${id}`, { withCredentials: true });
//         if (response?.data?.success) {
//           setBookingDetails(response.data.data);
//         } else {
//           toast.error("No bookings found.");
//         }
//       } catch (error) {
//         toast.error("Failed to fetch booking details.");
//         console.error("Error fetching bookings:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserBookings();
//   }, [id]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="container mx-auto text-2xl mt-10 p-10 font-bold text-center">
//       <h2>Payment Successful!</h2>
      
//       <div className="mt-8">
//         <h3 className="text-xl font-bold">User Details:</h3>
//         <div className="mt-4 p-4 border rounded-lg bg-gray-100">
//           <p><strong>Name:</strong> {username}</p>
//         </div>
//       </div>

//       {bookingDetails && (
//         <div className="mt-8">
//           <h3 className="text-xl font-bold">Booking Details:</h3>
//           <div className="mt-4 p-4 border rounded-lg bg-gray-100">
//             <p><strong>Car:</strong> {bookingDetails.car?.make} {bookingDetails.car?.model}</p>
//             <p><strong>Pickup Date:</strong> {new Date(bookingDetails.pickupDate).toLocaleDateString()}</p>
//             <p><strong>Drop-off Date:</strong> {new Date(bookingDetails.dropOffDate).toLocaleDateString()}</p>
//             <p><strong>Total Cost:</strong> ${bookingDetails.totalCost?.toFixed(2)}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };












// import { useParams } from 'react-router-dom';
// import { axiosInstance } from '../../config/axiosInstance';

// export const SuccessPage = () => {
//     const { id } = useParams(); // Get booking ID from URL
//     const [booking, setBooking] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchBookingDetails = async () => {
//             try {
//                 const response = await axiosInstance.get(`booking/userbooking-details/${id}`);
//                 setBooking(response.data.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching booking details:', error);
//                 setError('Failed to fetch booking details');
//                 setLoading(false);
//             }
//         };

//         fetchBookingDetails();
//     }, [id]);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>{error}</div>;

//     return (
//         <div>
//             <h1>Booking Details</h1>
//             {booking ? (
//                 <div>
//                     <p><strong>Booking ID:</strong> {booking._id}</p>
//                     <p><strong>User:</strong> {booking.user.name}</p>
//                     <p><strong>Car:</strong> {booking.car.make} {booking.car.model}</p>
//                     <p><strong>Pickup Date:</strong> {new Date(booking.pickupDate).toLocaleDateString()}</p>
//                     <p><strong>Drop Off Date:</strong> {new Date(booking.dropOffDate).toLocaleDateString()}</p>
//                     <p><strong>Total Cost:</strong> {booking.totalCost}</p>
//                     <p><strong>Status:</strong> {booking.status}</p>
//                 </div>
//             ) : (
//                 <div>No booking details found</div>
//             )}
//         </div>
//     );
// };



import React from 'react';
import { useNavigate } from 'react-router-dom';

export const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <div style={{ fontSize: '24px', color: 'green', fontWeight: 'bold' }}>
        Booking created successfully!
      </div>
      <button 
        onClick={() => navigate('/')} 
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
}
