import Favorite from "./pages/Favourite"; // FIX: Import path changed to match filename: Favourite.jsx
import { Routes, Route } from "react-router-dom";
import './index.css';



import { MovieProvider } from "./context/MovieContext";
import NavBar from "./components/Navbar";
import { Footer } from './components/Footer';
import Home from './pages/Home';



function App() {
  return (
    <>
    <MovieProvider>
      <NavBar />
      <main className="flex-1 p-8 box-border w-full flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorite />} /> 
        </Routes>
      </main>
      <Footer />
    </MovieProvider>
    </>
  );
}

export default App;