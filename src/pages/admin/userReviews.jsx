import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';

export const UserReviews = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  const fetchReviews = async () => {
    try {
      const response = await axiosInstance.get(`/review/reviewbyuser/${id}`);
      setReviews(response.data.reviews);
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch reviews');
    }
  };


  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await axiosInstance.delete(`review/review/${reviewId}`);
        toast.success('Review deleted successfully');
        // Remove the deleted review from the state
        setReviews(reviews.filter((review) => review._id !== reviewId));
      } catch (error) {
        console.log(error);
        toast.error('Failed to delete review');
      }
    }
  };


  useEffect(() => {
    fetchReviews();
  }, [id]);

  return (
    <div className="px-4 py-6 md:px-10 lg:px-20">
      <h1 className="text-xl font-bold mb-4">Reviews</h1>
      {reviews.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Car Make</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Car Model</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Rating</th> {/* Add Rating */}
                <th className="border border-gray-300 px-4 py-2 text-left">Comment</th> {/* Display Comment */}
                <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review._id}>
                  <td className="border border-gray-300 px-4 py-2">{review.car.make}</td>
                  <td className="border border-gray-300 px-4 py-2">{review.car.model}</td>
                  <td className="border border-gray-300 px-4 py-2">{review.rating}</td> {/* Render rating */}
                  <td className="border border-gray-300 px-4 py-2">{review.comment || 'No Comment'}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleDeleteReview(review._id)}  // Trigger delete action
                      className="btn btn-sm btn-primary"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No reviews found for this user</p>
      )}
    </div>
  );
};
