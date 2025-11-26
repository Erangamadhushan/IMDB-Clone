import Favorite from "./pages/Favourite"; // FIX: Import path changed to match filename: Favourite.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import './index.css';

import { MovieProvider } from "./context/MovieContext";
import Home from './pages/Home';
import { useAuthContext } from "./context/useContext/useAuthContext";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import  Register  from "./pages/Register";


const ProtectedRoute = ({children} : {children: React.ReactNode}) => {
  const {isAuthenticated} = useAuthContext();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}



function App() {
  return (
    <>
    <MovieProvider>
      <AuthProvider>
        <main className="flex-1 box-border w-full flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={
              <ProtectedRoute>
                <Favorite />
              </ProtectedRoute>
            } /> 
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </AuthProvider>
    </MovieProvider>
    </>
  );
}

export default App;