import Favorite from "./pages/Favourite"; 
import { Routes, Route, Navigate } from "react-router-dom";
import './index.css';

import { MovieProvider } from "./context/MovieContext";
import Home from './pages/Home';
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import  Register  from "./pages/Register";
import Explore from "./pages/Explore";
import { UserProfile } from "./pages/UserProfile";


const ProtectedRoute = ({children} : {children: React.ReactNode}) => {
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  if (!user || !token) {
    return <Navigate to="/login" />
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
            <Route path="/explore" element={<Explore />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user-profile" element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
      </AuthProvider>
    </MovieProvider>
    </>
  );
}

export default App;