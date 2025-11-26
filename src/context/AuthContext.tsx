import {createContext, useState} from "react"

type AuthContextType = {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}
export const AuthContext = createContext<AuthContextType | null>(null);


export const AuthProvider = ({children} : {children: React.ReactNode}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);
    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}