import React, { useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

export const ReviewPage = () => {
  const { carId } = useParams();
  const navigate = useNavigate(); // Add useNavigate hook
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  const handleRatingChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 5) {
      toast.error("Rating cannot be more than 5");
      setRating(5); // Set rating to 5 if it's greater
    } else if (value < 1) {
      toast.error("Rating cannot be less than 1");
      setRating(1); // Set rating to 1 if it's less
    } else {
      setRating(value); // Set rating normally
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`review/reviews`, {
        carId,
        rating,
        comment,
      }, { withCredentials: true });
      console.log(response);
      if (response?.data) {
        toast.success("Review submitted successfully!");
        // Redirect to a specific page after successful submission
        navigate(`/user/profile`); // Change this route to your desired page
      }
    } catch (error) {
      toast.error("Failed to submit review.");
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-10">
      <h2 className="text-3xl font-bold text-center mb-8">Submit Your Review</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Rating</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={handleRatingChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      
        <button type="submit" className="btn btn-primary">Submit Review</button>
      </form>
    </div>
  );
};
