import { useMovieContext } from "../context/MovieContext";
import MovieCard from "../components/ui/Home/MovieCard";
import { useState, useEffect } from "react";
//import { searchMovies } from "../services/api";
import type { Movie } from "../types/Movie";

function Favorite() {
  const { getAllFavorites } = useMovieContext();
  const [favorites, setFavorites] =  useState<Movie[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const favs = await getAllFavorites();
      console.log("Favorite movie IDs:", favs);

      setFavorites(favs);
    }
    fetchFavorites();
  }, []);

  return (
    <div className="favorites bg-linear-to-r from-red-950 via-red-800 to-red-950 p-8 w-full min-h-screen box-border">
      {/* Page Title */}
      <div>
        {/* Back button */}
        <a href="/" className="text-yellow-400 hover:text-yellow-500 font-semibold mb-4 inline-block">
          &larr; Back to Home
        </a>
      </div>
      <h2 className="mb-8 text-center text-4xl text-white drop-shadow-md">
        My Favorite Movies
      </h2>

      {/* Empty State */}
      {favorites.length === 0 ? (
        <div className="favorites-empty text-center p-16 sm:p-8 bg-white/5 rounded-xl mx-auto my-8 max-w-[600px]">
          <h2 className="mb-4 text-2xl text-[#e50914]">No Favorites Yet</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            You don't have any favorites yet! Go add some!
          </p>
        </div>
      ) : (
        /* Movies Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4 w-full box-border">
          {favorites.map((movie,index) => (
            <MovieCard key={index} movie={movie} className="animate-fadeIn" />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorite;
