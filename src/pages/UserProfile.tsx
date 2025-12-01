import  { useState, useEffect} from 'react'
import { useAuthContext } from '../context/useContext/useAuthContext';
import { authAPI } from '../services/api';
import type { User } from '../types/User';

export const UserProfile = () => {
    const { user } = useAuthContext();
    const [profileData, setProfileData] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await authAPI.getUserProfile(token || '');
        setProfileData(response.data.user);
      } catch (err) {
        setError('Failed to load profile data');
        console.error('Profile error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <p>Welcome, {user?.username}</p>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
        ) : profileData ? (
          <div>
            <p><strong>Username:</strong> {profileData.username}</p>
            <p><strong>Email:</strong> {profileData.email}</p>
          </div>
        ) : null}
    </div>
  )
}
