
import React, { useState } from 'react';
import axios from 'axios';

export const ReviewPage = () => {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [carId, setCarId] = useState('');  // Assuming you'll set the car ID for the review

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the review data object
    const reviewData = {
      car: carId,      // The car for which the review is being submitted
      rating: parseInt(rating),  // Ensure the rating is a number
      comment,
    };

    try {
      // Make a POST request to the backend API to submit the review
      const response = await axios.post('/review/reviews', reviewData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`  // Assuming you're using a token for authentication
        }
      });

      if (response.data.success) {
        alert('Review submitted successfully');
        // Optionally, clear the form fields
        setRating('');
        setComment('');
      } else {
        alert('Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('An error occurred while submitting the review');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Reviews</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col mb-4">
          <label htmlFor="car" className="text-lg font-medium mb-2">Car ID:</label>
          <input
            type="text"
            className="p-2 border rounded"
            value={carId}
            onChange={(e) => setCarId(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="rating" className="text-lg font-medium mb-2">Rating (1-5):</label>
          <input
            type="number"
            min="1"
            max="5"
            className="p-2 border rounded"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="comment" className="text-lg font-medium mb-2">Comment:</label>
          <textarea
            className="p-2 border rounded"
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit Review</button>
      </form>
    </div>
  );
};
