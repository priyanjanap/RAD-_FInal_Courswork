import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth.ts";
import { logout } from "../services/authService.ts";
import axios from "axios";
import toast from "react-hot-toast";
import { MdLibraryBooks } from "react-icons/md";
import Loading from "./PageLoading.tsx";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, logout: unauthenticate } = useAuth();

  const handleLogin = () => navigate("/login");
  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      toast.success("Logout successful!");
      unauthenticate();
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleDashboard = () => navigate("/dashboard");
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-gradient-to-r from-pink-600 via-purple-700 to-fuchsia-700 shadow-md border-b border-purple-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 md:h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-pink-500 rounded-xl shadow-md">
              <MdLibraryBooks className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Book Club</h1>
              <p className="text-sm text-pink-200">Library Management</p>
            </div>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn ? (
              <button
                onClick={handleLogin}
                className="px-4 py-2 text-sm text-white bg-pink-500 hover:bg-pink-600 rounded-md transition"
              >
                Login
              </button>
            ) : (
              <>
                <button
                  onClick={handleDashboard}
                  className="px-4 py-2 text-sm text-white bg-purple-600 hover:bg-purple-700 rounded-md transition"
                >
                  Dashboard
                </button>
                <button
                  disabled={isLoading}
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md transition"
                >
                  {isLoading ? "Logging out..." : "Logout"}
                </button>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
              aria-label="Toggle Menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 bg-purple-900/90 rounded-lg p-3 space-y-2 border-t border-pink-300/20">
            {!isLoggedIn ? (
              <button
                onClick={handleLogin}
                className="block w-full text-left px-4 py-2 text-sm bg-pink-500 hover:bg-pink-600 text-white rounded-md"
              >
                Login
              </button>
            ) : (
              <>
                <button
                  onClick={handleDashboard}
                  className="block w-full text-left px-4 py-2 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-md"
                >
                  Dashboard
                </button>
                <button
                  disabled={isLoading}
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md"
                >
                  {isLoading ? <Loading /> : "Logout"}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
