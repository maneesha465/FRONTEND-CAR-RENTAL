import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { axiosInstance } from "../../config/axiosInstance";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalAmount, bookingId, carMake, carModel } = location.state || {};

  useEffect(() => {
    const createCheckoutSession = async () => {
      try {
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY); // Use VITE instead of REACT_APP for Vite projects

        const response = await axiosInstance.post('/payment/create-checkout-session', {
          amount: totalAmount * 100, // Convert to cents
          bookingId,
        });

        const { id: sessionId } = response.data;

        const { error } = await stripe.redirectToCheckout({ sessionId });

        if (error) {
          console.error('Error redirecting to checkout:', error);
        }
      } catch (error) {
        console.error('Error creating checkout session:', error);
      }
    };

    if (totalAmount) {
      createCheckoutSession();
    }
  }, [totalAmount, bookingId]);

  return (
    <div className="container mx-auto text-center mt-10">
      <h2 className="text-2xl font-bold">Processing Payment for {carMake} {carModel}</h2>
    </div>
  );
};

export default PaymentPage;
