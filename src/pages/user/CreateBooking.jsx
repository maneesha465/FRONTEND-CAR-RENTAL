// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { axiosInstance } from "../../config/axiosInstance";
// import { useForm } from "react-hook-form";
// import toast from "react-hot-toast";

// export const CreateBooking = () => {
//   const { id } = useParams(); // Get car ID from URL
//   const [selectedCar, setSelectedCar] = useState(null); // Selected car data
//   const [loading, setLoading] = useState(false); // Loading state
//   const [totalCost, setTotalCost] = useState(0);

//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     watch,
//   } = useForm();

//   // Watch pickup and drop-off dates for changes
//   const pickupDate = watch("pickupDate");
//   const dropOffDate = watch("dropOffDate");

//   // Check if user is authenticated by checking for userId in localStorage
//   const getUserId = () => {
//     const userId = localStorage.getItem("userId");
//     console.log("User ID:", userId);
//     if (!userId) {
//       toast.error("User is not authenticated. Please login.");
//       navigate("/login"); // Redirect to login if not authenticated
//     }
//     return userId;
//   };

//   // Fetch car data based on car ID
//   const fetchCarData = async () => {
//     try {
//       const response = await axiosInstance.get(`/car/car-details/${id}`);
//       const carData = response?.data?.data || {};
//       setSelectedCar(carData);
//       setValue("car", carData?.make || ""); // Set the car's make in the form
//     } catch (error) {
//       toast.error("Failed to fetch car data");
//     }
//   };

//   useEffect(() => {
//     if (id) {
//       fetchCarData(); // Fetch car data when component mounts or car ID changes
//     }
//   }, [id]);

//   // Calculate total cost
//   const calculateTotalCost = () => {
//     if (pickupDate && dropOffDate && selectedCar) {
//       const days = (new Date(dropOffDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24);
//       const calculatedCost = days * selectedCar.pricePerDay;
//       setTotalCost(calculatedCost);
//     }
//   };

//   useEffect(() => {
//     calculateTotalCost(); // Recalculate cost when dates change
//   }, [pickupDate, dropOffDate, selectedCar]);

//   // Handle form submission
//   const onSubmit = async (data) => {
//     const userId = getUserId(); // Retrieve userId from localStorage

//     if (!userId) {
//       return; // If user is not authenticated, return early
//     }

//     setLoading(true); // Start loading

//     try {
//       const bookingDataPayload = {
//         user: userId, // Include user ID in the payload
//         car: selectedCar._id, // Pass the selected car's ID
//         pickupDate: data.pickupDate,
//         dropOffDate: data.dropOffDate,
//       };

//       const response = await axiosInstance.post(`/booking/create-booking/${id}`, bookingDataPayload, {
//         withCredentials: true,
//       });

//       if (response?.data?.success) {
//         toast.success("Booking created successfully");
//         // Redirect to the payment page after successful booking
//         navigate("/user/create-payment", {
//           state: {
//             totalAmount: totalCost, // Total cost for the booking
//             bookingId: response.data.data._id, // Pass booking ID from response
//           },
//         });
//       } else {
//         toast.error(response?.data?.message || "Failed to create booking");
//       }
//     } catch (error) {
//       toast.error("Failed to create booking");
//     } finally {
//       setLoading(false); // End loading
//     }
//   };

//   return (
//     <div className="container mx-auto text-2xl mt-10 p-10 font-bold text-center">
//       <h2>BOOK YOUR CAR</h2>

//       {loading ? (
//         <p>Loading...</p> // Display loading indicator while the form is submitting
//       ) : (
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <div className="flex flex-col pt-8">
//             {/* Car name */}
//             <label className="input input-bordered flex items-center gap-2">
//               <p>
//                 <strong className="label-text">Car:</strong>
//               </p>
//               <input
//                 className="grow label-text font-bold bg-gray-800 border-gray-600 placeholder-gray-400"
//                 {...register("car")}
//                 disabled
//                 value={(selectedCar?.make || "") + " " + (selectedCar?.model || "")}
//               />
//             </label>

//             {/* Pickup Date */}
//             <div className="pt-8">
//               <label className="input input-bordered flex items-center gap-2">
//                 <span className="label-text">Pickup Date :</span>
//                 <input
//                   type="date"
//                   {...register("pickupDate", { required: "Pickup date is required" })}
//                   required
//                 />
//               </label>

//               {errors.pickupDate && (
//                 <p className="text-red-500">{errors.pickupDate.message}</p>
//               )}
//             </div>

//             {/* Drop-off Date */}
//             <div className="pt-8">
//               <label className="input input-bordered flex items-center gap-2">
//                 <span className="label-text">Drop-off Date :</span>
//                 <input
//                   type="date"
//                   {...register("dropOffDate", { required: "Drop-off date is required" })}
//                   required
//                 />
//               </label>
//             </div>
//             {errors.dropOffDate && (
//               <p className="text-red-500">{errors.dropOffDate.message}</p>
//             )}

//             {/* Total Cost */}
//             <div className="pb-8 pt-6">
//               <div className="mt-4 p-4 border rounded-lg bg-gray-100">
//                 <p className="text-xl font-bold text-gray-700">
//                   <strong>Total Cost:</strong> ${totalCost.toFixed(2)}
//                 </p>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button type="submit" className="btn btn-primary" disabled={loading}>
//               {loading ? "Booking..." : "Confirm Booking"}
//             </button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };





import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

export const CreateBooking = () => {
  const { id } = useParams();
  const [selectedCar, setSelectedCar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalCost, setTotalCost] = useState(0);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const pickupDate = watch("pickupDate");
  const dropOffDate = watch("dropOffDate");

  const getUserId = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("User is not authenticated. Please login.");
      navigate("/login");
    }
    return userId;
  };

  const fetchCarData = async () => {
    console.log("Fetching car data...");
    try {
      const response = await axiosInstance.get(`/car/car-details/${id}`, { withCredentials: true });
      const carData = response?.data?.data || {};
      console.log("Car data fetched:", carData);
      setSelectedCar(carData);
      setValue("car", carData?.make || "");
    } catch (error) {
      toast.error("Failed to fetch car data");
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCarData();
    }
  }, [id]);

  const calculateTotalCost = () => {
    console.log("Calculating total cost...");
    if (pickupDate && dropOffDate && selectedCar) {
      const days = (new Date(dropOffDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24);
      const calculatedCost = days * selectedCar.pricePerDay;
      console.log("Total cost calculated:", calculatedCost);
      setTotalCost(calculatedCost);
    }
  };

  useEffect(() => {
    calculateTotalCost();
  }, [pickupDate, dropOffDate, selectedCar]);

  const onSubmit = async (data) => {
    const userId = getUserId();
    if (!userId) return;

    console.log("Booking data:", data);

    setLoading(true);
    try {
      const bookingDataPayload = {
        user: userId,
        car: selectedCar._id,
        pickupDate: data.pickupDate,
        dropOffDate: data.dropOffDate,
        totalCost,
      };

      console.log("Booking payload:", bookingDataPayload);

      const bookingResponse = await axiosInstance.post(
        `/booking/create-booking/${id}`,
        bookingDataPayload,
        { withCredentials: true }
      );

      console.log("Booking response:", bookingResponse);

      if (bookingResponse?.data?.success) {
        // Trigger the payment flow
        const bookingData = bookingResponse.data.data;
      console.log("Booking data for payment:", bookingData);
      
      await makePayment(bookingData, totalCost);
    } else {
        toast.error("Failed to create booking");
      }
    } catch (error) {
      toast.error("Failed to create booking");
      console.error("Error creating booking:", error);
    } finally {
      setLoading(false);
    }
  };

  const makePayment = async (bookingData, totalCost) => {
    console.log("Initiating payment with bookingData:", bookingData, "and totalCost:", totalCost);
    try {
      const stripeApiKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
    console.log("Stripe API Key:", stripeApiKey);

    if (!stripeApiKey || typeof stripeApiKey !== "string") {
      throw new Error("Invalid Stripe API Key");
    }

    const stripe = await loadStripe(stripeApiKey);
    if (!stripe) throw new Error("Stripe failed to load");

      const sessionResponse = await axiosInstance.post("/payment/create-checkout-session", {
        bookingData,
        totalCost,
      });

      console.log("Session response:", sessionResponse);

      const sessionId = sessionResponse?.data?.sessionId;
      console.log("Session ID received:", sessionId);

      if (sessionId) {
        console.log("Redirecting to Stripe checkout with session ID:", sessionId);
        const result = await stripe.redirectToCheckout({ sessionId });

        if (result.error) {
          toast.error(result.error.message);
          console.error("Stripe checkout error:", result.error);
        }
      } else {
        toast.error("Failed to create Stripe session.");
        console.error("No session ID returned from backend.");
      }
    } catch (error) {
      toast.error("Payment failed, please try again.");
      console.error("Payment error:", error);
    }
  };

  return (
    <div className="container mx-auto text-2xl mt-10 p-10 font-bold text-center">
      <h2>BOOK YOUR CAR</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col pt-8">
            <label className="input input-bordered flex items-center gap-2">
              <p>
                <strong className="label-text">Car:</strong>
              </p>
              <input
                className="grow label-text font-bold bg-gray-800 border-gray-600 placeholder-gray-400"
                {...register("car")}
                disabled
                value={(selectedCar?.make || "") + " " + (selectedCar?.model || "")}
              />
            </label>

            <div className="pt-8">
              <label className="input input-bordered flex items-center gap-2">
                <span className="label-text">Pickup Date :</span>
                <input
                  type="date"
                  {...register("pickupDate", { required: "Pickup date is required" })}
                  required
                />
              </label>

              {errors.pickupDate && (
                <p className="text-red-500">{errors.pickupDate.message}</p>
              )}
            </div>

            <div className="pt-8">
              <label className="input input-bordered flex items-center gap-2">
                <span className="label-text">Drop-off Date :</span>
                <input
                  type="date"
                  {...register("dropOffDate", { required: "Drop-off date is required" })}
                  required
                />
              </label>
            </div>
            {errors.dropOffDate && (
              <p className="text-red-500">{errors.dropOffDate.message}</p>
            )}

            <div className="pb-8 pt-6">
              <div className="mt-4 p-4 border rounded-lg bg-gray-100">
                <p className="text-xl font-bold text-gray-700">
                  <strong>Total Cost:</strong> ${totalCost.toFixed(2)}
                </p>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
