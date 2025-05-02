import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PokemonProvider } from "./contexts/PokemonContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import PokemonDetail from "./pages/PokemonDetail";
import Favorites from "./pages/Favorites";
import CompareView from "./pages/CompareView";

function App() {
  return (
    <ErrorBoundary>
      <PokemonProvider>
        <Router>
          <div className="min-h-screen bg-gray-100">
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/pokemon/:id" element={<PokemonDetail />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/compare" element={<CompareView />} />
            </Routes>
          </div>
        </Router>
      </PokemonProvider>
    </ErrorBoundary>
  );
}

export default App;
