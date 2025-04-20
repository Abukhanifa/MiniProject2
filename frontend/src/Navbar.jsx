import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("access_token");
      setIsAuthenticated(!!token);
    };

    checkAuth();
    const interval = setInterval(checkAuth, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-blue-600 tracking-wide hover:text-blue-700 transition-all duration-200"
        >
          Jobify
        </Link>

        {/* Navigation */}
        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <li>
            <Link to="/vacancies" className="hover:text-blue-600 transition-colors duration-200">
              Vacancies
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-600 transition-colors duration-200">
              About
            </Link>
          </li>
        </ul>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold shadow hover:bg-blue-700 transition cursor-pointer">
                  U
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-500 transition-colors duration-200"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
