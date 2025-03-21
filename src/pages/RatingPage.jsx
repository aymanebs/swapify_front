import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { createRating } from '../services/ratingApi';

const RatePage = () => {
  const { receiverId } = useParams();
  const location = useLocation();
  const requestId = new URLSearchParams(location.search).get('requestId');
  const [score, setScore] = useState(1);
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const ratingData = {
        ratedUser: receiverId,
        request: requestId,
        score,
        comment,
      };
      await createRating(ratingData);
      alert('Thank you for your rating!');
      navigate('/'); 
    } catch (error) {
      console.error('Failed to submit rating:', error);
      alert('Failed to submit rating. Please try again.');
    }
  };

  // Generate star rating UI
  const StarRating = () => {
    const stars = [1, 2, 3, 4, 5];
    
    return (
      <div className="flex justify-center space-x-2 my-6">
        {stars.map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setScore(star)}
            className={`text-3xl focus:outline-none transition-all duration-200 ${
              star <= score ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-indigo-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-indigo-600">Rate Your Experience</h2>
          <p className="mt-2 text-gray-600">Let us know how your exchange went</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-center block text-sm font-medium text-gray-700 mb-1">
              How would you rate this exchange? (1-5)
            </label>
            <StarRating />
            
            {/* Hidden number input for form submission */}
            <input
              type="number"
              min="1"
              max="5"
              value={score}
              onChange={(e) => setScore(parseInt(e.target.value))}
              className="sr-only"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Share your thoughts (optional)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us about your experience..."
              className="w-full px-4 py-3 border text-gray-700 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
              rows="4"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
          >
            Submit Rating
          </button>
        </form>
      </div>
    </div>
  );
};

export default RatePage;