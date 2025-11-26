import MovieCard from "../components/ui/Home/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";



function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        console.log("Loading popular movies...");
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.error(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery.trim()) return
    if (loading) return

    setLoading(true)
    try {
        const searchResults = await searchMovies(searchQuery)
        setMovies(searchResults)
        setError(null)
    } catch (err) {
        console.log(err)
        setError("Failed to search movies...")
    } finally {
        setLoading(false)
    }
  };

  return (
    <div className="md:py-8 w-full box-border sm:py-8 py-4">
      <form onSubmit={handleSearch} className="max-w-[600px] mx-auto md:mb-8 flex gap-4 px-4 box-border sm:mb-8 mb-4">
        <input
          type="text"
          placeholder="Search for movies..."
          className="flex-1 py-3 px-4 rounded bg-[#333] text-white text-base 
         focus:outline-none focus:ring-2 focus:ring-[#666]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="py-3 px-6 bg-[#e50914] text-white rounded font-medium whitespace-nowrap 
         hover:bg-[#f40612] transition-colors">
          Search
        </button>
      </form>

        {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 p-4 w-full box-border">
          {movies.map((movie, index) => (
            <MovieCard movie={movie} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
