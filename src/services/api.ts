import axios from 'axios';

const API_KEY: string = import.meta.env.VITE_API_KEY;
const BASE_URL: string = import.meta.env.VITE_BASE_URL;
const API_URL: string = import.meta.env.VITE_API_URL;


export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  console.log("API Key:", API_KEY);
  console.log("Base URL:", BASE_URL);
  return data.results;
  
};

export const searchMovies = async (query: string) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );
  const data = await response.json();
  return data.results;
};

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const authAPI = {
  login: (email: string, password: string) => {
    return api.post('/api/auth/user/login', { email, password });
  },
  register: (username: string, email: string, password: string) => {
    return api.post('/api/auth/user/register', { username, email, password });
  },
  getUserProfile: (token: string) => {
    return api.get('/api/auth/user/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}

export default api;
