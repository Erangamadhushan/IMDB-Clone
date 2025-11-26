import { useMovieContext } from "../context/MovieContext";
import MovieCard from "../components/ui/Home/MovieCard";

function Favorite() {
  const { favorites } = useMovieContext();

  return (
    <div className="favorites p-8 w-full box-border">
      {/* Page Title */}
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
        <div className="movies-grid grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 p-4 w-full box-border">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} className="animate-fadeIn" />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorite;
