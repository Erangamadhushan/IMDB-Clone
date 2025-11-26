import { useMovieContext } from "../../../context/useContext/useMovieContext";
import type { Movie } from "../../../types/Movie";

function MovieCard({ movie, key }: { movie: Movie; key: number; className: string}) {
    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
    const favorite = isFavorite(movie.id);

    function onFavoriteClick(e : React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (favorite) removeFromFavorites(movie.id);
        else addToFavorites(movie);
    }


    return (
        <div className="relative rounded-lg overflow-hidden bg-[#1a1a1a] group flex flex-col h-full transition-transform hover:scale-[1.03] text-sm sm:text-base">
        
            {/* Movie Poster */}
            <div data-key={key} className="relative w-full aspect-2/3 sm:aspect-2/3 overflow-hidden" >
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-[1.05]"
                />

                
                
                <div className="movie-modal absolute inset-0 bg-black/80 text-white p-4 opacity-0 hover:opacity-100 flex flex-col justify-center items-center text-center transition-all">
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
                    <h3 className="text-lg font-bold mb-2">{movie.title}</h3>
                    <p className="">
                        {movie.overview}
                    </p>
                </div>
            </div>

            {/* Movie Info */}
            <div className="movie-info p-3 sm:p-4 flex-1 flex flex-col gap-2">
                <h3 className="text-yellow-400 text-base font-semibold flex justify-between"><span className="text-lg">{movie.title} </span><span className="text-xl">{movie.release_date?.split("-")[0]}</span></h3>
                <p className="text-gray-400 text-sm">Movie Rate <span className="text-yellow-400">{(movie.vote_average).toFixed(2)}/10</span></p>
            </div>
        </div>
    );
}

export default MovieCard;
