import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useMovieContext } from "../context/MovieContext";
import MovieCard from "../components/ui/Home/MovieCard";
import { authAPI } from "../services/api";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/User";
import type { Movie } from "../types/Movie";

export const UserProfile = () => {
  const { logout } = useAuthContext();
  const [profileData, setProfileData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const navigate = useNavigate();
  const { getAllFavorites } = useMovieContext();

  const logoutProfile = () => {
    logout();
    setProfileData(null);
  };

  
  useEffect(() => {
    const fetchFavorites = async () => {
      const favs: Movie[] = await getAllFavorites();
      console.log("Favorite movie IDs:", favs);
      favs.map((movie: Movie) =>{
        console.log("Favorite movie data:", movie);
        setFavorites((prev) => [...prev, movie]);
      });
    }
    fetchFavorites();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await authAPI.getUserProfile(token);
        //console.log("Profile response:", response.data.user._doc);
        setProfileData(response.data.user._doc);
      } catch (err) {
        setError("Failed to load profile data");
        console.error(err);
      } finally {
        setLoading(false);
        console.log(profileData);
      }
    };

    fetchProfile();
  }, []); // ✅ EMPTY dependency array

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-6">
      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Left: Collection area (col-span 9 on large screens) */}
          <section className="xl:col-span-9 bg-red-900/90 border border-black rounded-md p-6">
            <div>
              {/* Back button */}
              <a
                href="/"
                className="text-yellow-400 hover:text-yellow-500 font-semibold mb-4 inline-block"
              >
                &larr; Back to Home
              </a>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-4">
                Welcome, {profileData?.username || "User"}!
              </h1>
              <p className="text-gray-300 mb-6">
                Here is your favorite movie collection.
              </p>
            </div>
            <h2 className="flex text-2xl font-semibold justify-end text-center mb-4">
              <span className="text-sm p-2 rounded-md bg-amber-500">
                <a href="/explore">Explorer Movies</a>
              </span>
            </h2>

            <div className="">
              {/* Movie cards */}
              {favorites.length === 0 ? (
                <div className="favorites-empty text-center p-16 sm:p-8 bg-white/5 rounded-xl mx-auto my-8 max-w-[600px]">
                  <h2 className="mb-4 text-2xl text-[#e50914]">
                    No Favorites Yet
                  </h2>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    You don't have any favorites yet! Go add some!
                  </p>
                </div>
              ) : (
                /* Movies Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 p-4 w-full box-border">
                  {favorites.map((movie, index) => (
                    <MovieCard
                      key={index}
                      movie={movie}
                      className="animate-fadeIn"
                    />
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Right: Profile card (col-span 3 on large screens) */}
          <aside className="xl:col-span-3 bg-red-900/90 border border-black rounded-md p-6 flex flex-col items-center h-screen sticky top-5 left-0">
            {loading ? (
              <p>Loading profile...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : profileData ? (
              <div className="text-center">
                <div className="text-center mb-6">
                  <h3 className="font-semibold text-lg">
                    {profileData?.username}
                  </h3>
                  <p className="text-sm text-gray-200">{profileData?.email}</p>
                </div>

                <div className="w-full">
                  <button
                    onClick={() =>
                      alert("Profile action - implement edit profile")
                    }
                    className="w-full mb-3 bg-black/70 hover:bg-black/80 text-white rounded-md py-2"
                  >
                    Edit Profile
                  </button>

                  <button
                    onClick={logoutProfile}
                    className="w-full bg-red-700 hover:bg-red-600 text-white rounded-md py-2"
                  >
                    Logout
                  </button>
                </div>

                <div className="mt-auto text-xs text-gray-300 pt-6">
                  <p>
                    Member since: <span className="font-medium">2025</span>
                  </p>
                </div>
              </div>
            ) : (
              <p>No profile data available.</p>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};
