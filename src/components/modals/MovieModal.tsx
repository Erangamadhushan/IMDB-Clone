import type { Movie } from "../../types/Movie";
interface Props {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: Props) {
  if (!movie) return null;
  console.log("Modal movie data:", movie);

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-zinc-900 text-white rounded-lg w-[90%] max-w-3xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl text-gray-400 hover:text-white"
        >
          ✕
        </button>

        <div className="flex gap-6">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/placeholder.png"
            }
            alt={movie.title}
            className="w-40 rounded-lg"
          />

          <div>
            <h2 className="text-2xl font-bold">{movie.title}</h2>
            <p className="text-sm text-gray-400 mb-2">
              {movie.release_date
                ? new Date(movie.release_date).getFullYear()
                : "N/A"}{" "}
              • ⭐ {movie.vote_average?.toFixed(1)}/10
            </p>

            <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
