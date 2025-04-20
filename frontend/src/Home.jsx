import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('access_token');

  const handleMatchClick = () => {
    navigate('/vacancies');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white px-4 text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-blue-600 mb-6">
        Welcome to Jobify
      </h1>
      <p className="text-lg md:text-xl text-gray-700 max-w-2xl mb-8">
        Your AI-powered assistant to match resumes with job descriptions, detect skill gaps, and optimize your chances of getting hired.
      </p>

      <div className="flex flex-col md:flex-row gap-4">
        {!isLoggedIn ? (
          <Link
            to="/login"
            className="px-6 py-3 bg-gray-100 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition"
          >
            Login to see!
          </Link>
        ) : (
          <button
            onClick={handleMatchClick}
            className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
          >
            Match Me!
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
