import { useState, useEffect } from 'react'
import { useAuthContext } from '../context/AuthContext';
import { useMovieContext } from '../context/MovieContext';
import MovieCard from "../components/ui/Home/MovieCard";
import { authAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types/User';

export const UserProfile = () => {
  const { user, logout } = useAuthContext();
  const [profileData, setProfileData] = useState<User | null>(null);

  const { favorites } = useMovieContext();
  const navigate = useNavigate();

  const logoutProfile = () => {
    logout();
    setProfileData(null);
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await authAPI.getUserProfile(token);
        setProfileData(response.data.user._doc);
      } catch (err) {
        setError("Failed to load profile data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []); // ✅ EMPTY dependency array

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Collection area (col-span 9 on large screens) */}
          <section className="lg:col-span-9 bg-red-900/90 border border-black rounded-md p-6">
            <h2 className="flex text-2xl font-semibold justify-between text-center mb-4"><span>My Favorite Collection</span> <span className='text-sm p-2 rounded-md bg-amber-500'><a href="/explore">Explorer Movies</a></span></h2>


            <div className="">
              {/* Movie cards */}
              {favorites.length === 0 ? (
              <div className="favorites-empty text-center p-16 sm:p-8 bg-white/5 rounded-xl mx-auto my-8 max-w-[600px]">
                <h2 className="mb-4 text-2xl text-[#e50914]">No Favorites Yet</h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  You don't have any favorites yet! Go add some!
                </p>
              </div>
              ) : (
                /* Movies Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 p-4 w-full box-border">
                  {favorites.map((movie,index) => (
                    <MovieCard key={index} movie={movie} className="animate-fadeIn" />
                  ))}
                </div>
              )}
            </div>


            {/* Example details / bio lines */}
            <div className="space-y-3">
              <p className="h-2 bg-black/20 rounded w-full max-w-[90%]"></p>
              <p className="h-2 bg-black/20 rounded w-full max-w-[85%]"></p>
              <p className="h-2 bg-black/20 rounded w-full max-w-[80%]"></p>
              <p className="h-2 bg-black/20 rounded w-full max-w-[75%]"></p>
            </div>
          </section>


          {/* Right: Profile card (col-span 3 on large screens) */}
          <aside className="lg:col-span-3 bg-red-900/90 border border-black rounded-md p-6 flex flex-col items-center h-screen sticky top-5 left-0">
            {/* <div className="w-36 h-36 rounded-full bg-white overflow-hidden mb-4">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt={`${user.name} avatar`} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-black font-bold">{user.name?.charAt(0) ?? "U"}</div>
              )}
            </div> */}


            <div className="text-center mb-6">
              <h3 className="font-semibold text-lg">{profileData?.username}</h3>
              <p className="text-sm text-gray-200">{profileData?.email}</p>
            </div>


            <div className="w-full">
              <button
                onClick={() => alert('Profile action - implement edit profile')}
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
              <p>Member since: <span className="font-medium">2025</span></p>
            </div>
          </aside>
        </div>
        </div>
      </div>
  )
}
