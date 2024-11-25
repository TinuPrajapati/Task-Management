import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center bg-gray-900 text-white">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl mt-4">Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/login"
        className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 rounded-md text-lg hover:scale-105 transform transition duration-200"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
