import React, { useState } from 'react';
import { Search, Plus, Film } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function IMDBNavbar() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <nav className="bg-red-950 border-b border-red-800 py-2 sticky top-0 z-50 scroll:backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Film className="w-8 h-8 text-yellow-400" />
            <Link to="/"><h1 className="text-2xl font-bold text-yellow-400">IMDB-Clone</h1></Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for movies, TV shows, actors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full bg-yellow-400 text-white px-4 py-2 pl-10 rounded-lg border border-gray-700 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 placeholder:text-black"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-black" />
            </div>
          </div>

          {/* Add to Collection Button */}
          <button className="flex items-center space-x-2 cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-lg transition-colors duration-200">
            <Plus className="w-5 h-5" />
            <span>Add to Collection</span>
          </button>
        </div>
      </div>
    </nav>
  );
}