import { createContext, useContext, useState } from "react";
import { movieAPI } from "../services/api";
import type { Movie } from "../types/Movie";

type MovieContextType = {
  favorites: string[];
  isFavorite: (movieId: string) => Promise<boolean | undefined>;
  removeMovieFromFavorites: (movieId: string) => Promise<boolean>;
  addMovieToFavorites: (movie: Movie) => Promise<boolean>;
  getAllFavorites: () => Promise<Movie[]>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const MovieContext = createContext<MovieContextType | null>(null);

export const MovieProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState([]);

  const isFavorite = async (movieId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return false;

      const response = await movieAPI.getFavoriteMovies(token);
      //console.log("Favorite movies response:", response.data.movies);

      const isFav = response.data.movies.some(
        (movie: string) => movie == movieId
      );
      return isFav;
    } catch (error) {
      console.error("Error checking favorite status:", error);
    }
  };

  const getAllFavorites = async (): Promise<Movie[]> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return [];
      const response = await movieAPI.getFavoriteMovies(token);
      setFavorites(response.data.movies);
      return response.data.movies;
    } catch (error) {
      console.error("Error fetching favorite movies:", error);
      return [];
    }
  };

  const removeMovieFromFavorites = async (
    movieId: string
  ): Promise<boolean> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return false;

      await movieAPI.removeFavoriteMovie(token, movieId);
      setFavorites((prev) => prev.filter((id) => id !== movieId));

      return true;
    } catch (error) {
      console.error("Error removing movie from favorites:", error);
      return false;
    }
  };

  const addMovieToFavorites = async (movie: Movie): Promise<boolean> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return false;

    await movieAPI.addFavoriteMovie(token, movie);
    // setFavorites((prev) => [...prev, movie.id]);
    
    return true;
  } catch (error) {
    console.error("Error adding movie to favorites:", error);
    return false;
  }
};


  return (
    <MovieContext.Provider
      value={{
        favorites,
        isFavorite,
        getAllFavorites,
        removeMovieFromFavorites,
        addMovieToFavorites,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMovieContext = () => {
  const ctx = useContext(MovieContext);
  if (!ctx) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return ctx;
};
