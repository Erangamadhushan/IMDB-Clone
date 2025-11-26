import { useMovieContext } from "../../../context/MovieContext";
import type { Movie } from "../../../types/Movie";

function MovieCard({ movie, key }: { movie: Movie; key: number;}) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  function onFavoriteClick(e : React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  return (
    <div className="relative rounded-lg overflow-hidden bg-[#1a1a1a] flex flex-col h-full transition-transform hover:-translate-y-1 text-sm sm:text-base">
      
      {/* Movie Poster */}
      <div data-key={key} className="relative w-full aspect-2/3 sm:aspect-2/3 overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/10 to-black/80 opacity-0 hover:opacity-100 flex flex-col justify-end p-4 transition-opacity">

          {/* Favorite Button */}
          <button
            onClick={onFavoriteClick}
            className={`
              absolute top-4 right-4 w-10 h-10 sm:w-10 sm:h-10 
              rounded-full flex items-center justify-center transition-colors 
              ${favorite ? "bg-red-600 text-white" : "bg-black/50 text-white"} 
              hover:bg-red-500
            `}
          >
            ♥
          </button>

        </div>
      </div>

      {/* Movie Info */}
      <div className="movie-info p-3 sm:p-4 flex-1 flex flex-col gap-2">
        <h3 className="text-base font-semibold">{movie.title}</h3>
        <p className="text-gray-400 text-sm">{movie.release_date?.split("-")[0]}</p>
        <p className="text-gray-400 text-sm">{movie.overview}</p>
        <p className="text-gray-400 text-sm">Movie Rate {movie.vote_average}/10</p>
      </div>
    </div>
  );
}

export default MovieCard;
