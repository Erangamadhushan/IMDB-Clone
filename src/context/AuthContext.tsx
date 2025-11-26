import {createContext, useState} from "react"
import type { User } from "../types/User";

type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}
export const AuthContext = createContext<AuthContextType | null>(null);


export const AuthProvider = ({children} : {children: React.ReactNode}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);

    const login = (userData: User, token: string) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
    };
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
    };
    
    
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}