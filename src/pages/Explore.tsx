import IMDBNavbar from '../components/Navbar'
import { Footer } from '../components/Footer'
import { useState, useEffect } from 'react';
import { getPopularMovies } from "../services/api";
import MovieCard from '../components/ui/Home/MovieCard';

function Explore() {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

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

    return (
        <>
            <IMDBNavbar />
            <section className="explore-section w-full py-20 border-b-4 border-b-red-950 bg-linear-to-l from-red-950 via-red-800 to-red-950 text-white items-center px-4">
                <div className="max-w-5xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2">
                    <div>
                        <h2 className="text-4xl font-bold my-4 text-center">Explore More Movies</h2>
                    </div>
                    
                </div>
                <div >
                    {error && <div className="error-message">{error}</div>}

                    {loading ? (
                    <div className="loading">Loading...</div>
                    ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4 w-full box-border">
                        {movies.map((movie, index) => (
                        <MovieCard movie={movie} key={index} className="animate-spin" />
                        ))}
                    </div>
                    )}
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Explore