import React, { useEffect, useState } from "react";
import { Search, Plus, Film } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function IMDBNavbar() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loginStatus, setLoginStatus] = useState<boolean>(false);
  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    setLoginStatus(isAuthenticated);
    console.log("Navbar - isAuthenticated:", isAuthenticated);
  }, [isAuthenticated]);

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  const handleUserProfile = () => {
    window.location.href = "/user-profile";
  };

  return (
    <nav className="py-4 max-w-7xl mx-auto fixed top-5 left-5 right-5 z-50  backdrop-blur-lg shadow-lg rounded-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Film className="w-8 h-8 text-yellow-400" />
            <Link to="/">
              <h1 className="text-2xl font-bold text-yellow-400">IMDB-Clone</h1>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8 hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for movies, TV shows, actors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full border-yellow-400 text-white px-4 py-2 pl-10 rounded-lg border focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 placeholder:text-yellow-400"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-yellow-400" />
            </div>
          </div>

          {/* Add to Collection Button */}
          <a
            href="/favorites"
            className="flex items-center space-x-2 cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden md:block">Add to Collection</span>
          </a>
          {loginStatus ? (
            <button
              onClick={handleUserProfile}
              className="ml-4 bg-yellow-400 cursor-pointer hover:bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <img
                src="./icons/user.png"
                alt="user"
                className="w-8 h-8 inline-block mr-2"
              />
            </button>
          ) : (
            <Link
              to="/login"
              className="ml-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
