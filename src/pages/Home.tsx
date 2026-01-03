import MovieCard from "../components/ui/Home/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
//import MovieModal from "../components/modals/MovieModal";

import { HeroSection } from "../components/Home/HeroSection";
import { About } from "../components/Home/About";
import { ExplorerSection } from "../components/Home/ExplorerSection";
import { Footer } from "../components/Footer";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectMovie, setSelectMovie] = useState<boolean>(false);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
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
  }, []); // ✅ run once

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      const popularMovies = await getPopularMovies();
      setMovies(popularMovies);
      setError(null);
      setLoading(false);
      return;
    }
    if (loading) return;

    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full bg-linear-to-r from-red-950 via-red-800 to-red-950 min-h-screen box-border">
        <HeroSection />
        <About />
        <div className="md:py-8 w-full box-border sm:py-8 py-4">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            {searchQuery
              ? `Search Results for "${searchQuery}"`
              : "Popular Movies"}
          </h2>
          <form
            onSubmit={handleSearch}
            className="max-w-[600px] mx-auto md:mb-8 flex gap-4 px-4 box-border sm:mb-8 mb-4"
          >
            <input
              type="text"
              placeholder="Search for movies..."
              className="flex-1 py-3 px-4 bg-yellow-400 rounded-full text-white text-base 
                        focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-black/70"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="py-3 px-6 bg-yellow-400 text-white rounded-xl font-medium whitespace-nowrap 
                        hover:bg-yellow-500 transition-colors"
            >
              Search
            </button>
          </form>

          {error && <div className="error-message">{error}</div>}

          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4 w-full box-border">
              {movies.map((movie, index) => (
                <>
                  <MovieCard
                    movie={movie}
                    key={index}
                    onClick={() => setSelectMovie(true)}
                    className={`animate-spin ${selectMovie ? "scale-105" : ""}`}
                  />
                </>
              ))}
            </div>
          )}
        </div>
      </div>
      <ExplorerSection />
      <Footer />
    </>
  );
}

export default Home;
