import Favorite from "./pages/Favourite"; // FIX: Import path changed to match filename: Favourite.jsx
import { Routes, Route } from "react-router-dom";
import './index.css';

import { MovieProvider } from "./context/MovieContext";
import NavBar from "./components/Navbar";
import { Footer } from './components/Footer';
import Home from './pages/Home';
import { useAuthContext } from "./context/useContext/useAuthContext";


const ProtectedRoute = ({children} : {children: React.ReactNode}) => {
  const {login, isAuthenticated} = useAuthContext();
  if (!isAuthenticated) {
    login();
    return null;
  }

  return children;
}



function App() {
  return (
    <>
    <MovieProvider>
      <NavBar />
      <main className="flex-1 box-border w-full flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<ProtectedRoute><Favorite /></ProtectedRoute>} /> 
        </Routes>
      </main>
      <Footer />
    </MovieProvider>
    </>
  );
}

export default App;