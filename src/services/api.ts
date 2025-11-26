const API_KEY: string = import.meta.env.VITE_API_KEY;
const BASE_URL: string = import.meta.env.VITE_BASE_URL;


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

