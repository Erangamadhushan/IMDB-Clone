import Favorite from "./pages/Favourite"; 
import { Routes, Route } from "react-router-dom";
import './index.css';

import { MovieProvider } from "./context/MovieContext";
import Home from './pages/Home';
import { AuthProvider, useAuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import  Register  from "./pages/Register";
import Explore from "./pages/Explore";
import { UserProfile } from "./pages/UserProfile";
import { useNavigate } from "react-router-dom";


const ProtectedRoute = ({children} : {children: React.ReactNode}) => {
  // const user = localStorage.getItem('user');
  // const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
     navigate('/login');
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