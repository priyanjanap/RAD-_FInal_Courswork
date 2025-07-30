import React from "react";
import { useNavigate } from "react-router-dom";
import libraryImg from "../assets/images.jpeg"

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-10 flex flex-col lg:flex-row items-center space-y-10 lg:space-y-0 lg:space-x-10 border border-white/20">

        {/* Left - Image */}
        <div className="w-full lg:w-1/2">
          <img
            src={libraryImg}
            alt="Library"
            className="rounded-2xl shadow-lg w-full h-full object-cover"
          />
        </div>

        {/* Right - Text and Actions */}
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
          <h1 className="text-4xl font-bold text-white leading-tight">
            Welcome to <br />
            <span className="text-purple-300">Book Club Library</span>
          </h1>
          <p className="text-purple-200 text-lg">
            Organize books, track readers, and manage lending easily in one platform.
          </p>

          <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-lg font-semibold shadow-lg transition-all duration-300"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-6 py-3 border border-purple-300 text-purple-100 hover:bg-purple-500 hover:text-white rounded-xl text-lg font-semibold transition-all duration-300"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
