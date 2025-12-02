/* eslint-disable react-refresh/only-export-components */
import {createContext, useState, useEffect} from "react"
import type { User } from "../types/User";
import { Navigate } from 'react-router-dom';

type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (userData: User, token: string) => void;
    logout: () => void;
};


export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null >(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Check if user is logged in (token exists in localStorage)
        const token = localStorage.getItem('token');
        const storedUser: string | null = localStorage.getItem('user');
        
        if (token && storedUser) {
            try {
                const userData: User | null = JSON.parse(storedUser);
                if (userData) {
                    setUser(userData);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error parsing stored user:', error);
                setLoading(false);
            }
        }

        setLoading(false);
    }, []);

    const login = (userData: User, token: string) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        console.log(userData);
        console.log(token);
        alert("Login credentials saved successfully!");
        setUser(userData);
        setIsAuthenticated(true);
    };
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
        <Navigate to="/login" />
    };
    
    
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}