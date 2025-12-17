import {createContext, useContext, useState} from "react"
import { movieAPI } from "../services/api";
import type { Movie } from "../types/Movie";

type MovieContextType = {
    favorites: string[];
    isFavorite: (movieId: string) => Promise<boolean | undefined>;
    removeMovieFromFavorites: (movieId: string) => boolean;
    addMovieToFavorites: (movie: Movie) => boolean;
    getAllFavorites: () => Promise<string[]>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const MovieContext = createContext<MovieContextType | null>(null);

export const MovieProvider = ({children} : {children: React.ReactNode}) => {
    const [favorites, setFavorites] = useState([]);
    
    const isFavorite =  async (movieId: string) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return false;

            const response = await movieAPI.getFavoriteMovies(token);
            //console.log("Favorite movies response:", response.data.movies);

            const isFav = response.data.movies.some((movie: string ) => movie == movieId);
            return isFav;
            
        } catch (error) {
            console.error("Error checking favorite status:", error);

        }
    }

    const getAllFavorites = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return [];
            const response = await movieAPI.getFavoriteMovies(token);
            return response.data.movies;
        } catch (error) {
            console.error("Error fetching favorite movies:", error);
            return [];
        }
    }

    const removeMovieFromFavorites = (movieId: string) => {
        try {
            //console.log("Removing movie from favorites:", movieId);
            const token = localStorage.getItem("token");
            if (!token) return false;

            movieAPI.removeFavoriteMovie(token, movieId)
                .then(() => {
                    console.log("Movie removed from favorites successfully");
                    return false;
                })
                .catch((error) => {
                    console.error("Error removing movie from favorites:", error);
                });

        }
        catch (error) {
            console.error("Error in removeMovieFromFavorites:", error);
        }
    }

    const addMovieToFavorites = (movie: Movie) => {
        try {
            //console.log("Adding movie to favorites:", movieId);
            const token = localStorage.getItem("token");
            if (!token) return false;

            movieAPI.addFavoriteMovie(token, movie)
                .then(() => {
                    console.log("Movie added to favorites successfully");
                    return true;
                })
                .catch((error) => {
                    console.error("Error removing movie from favorites:", error);
                });
            return false
        }
        catch(error) {
            console.error("Error in favorites", error);
        }
    }
        


    return (
        <MovieContext.Provider value={{ favorites, isFavorite,getAllFavorites, removeMovieFromFavorites, addMovieToFavorites }}>
            {children}
        </MovieContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useMovieContext = () => {
    const ctx = useContext(MovieContext);
        if (!ctx) {
            throw new Error("useMovieContext must be used within a MovieProvider");
        }
        return ctx;     
}