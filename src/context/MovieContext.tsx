import {createContext, useState, useEffect} from "react"
import type { Movie } from "../types/Movie"

type MovieContextType = {
    favorites: Movie[];
    addToFavorites: (movie: Movie) => void;
    removeFromFavorites: (movieId: Movie['id']) => void;
    isFavorite: (movieId: Movie['id']) => boolean;
}

export const MovieContext = createContext<MovieContextType | null>(null);



export const MovieProvider = ({children} : {children: React.ReactNode}) => {
    const [favorites, setFavorites] = useState<Movie[]>(() => {
        try {
            const stored = localStorage.getItem("favorites")
            return stored ? JSON.parse(stored) as Movie[] : []
        } catch {
            return []
        }
    })

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    const addToFavorites = (movie : Movie) => {
        setFavorites(prev => [...prev, movie])
    }

    const removeFromFavorites = (movieId: Movie['id']) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    }
    
    const isFavorite = (movieId: Movie['id']) => {
        return favorites.some(movie => movie.id === movieId)
    }


    return (
        <MovieContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
            {children}
        </MovieContext.Provider>
    );
}