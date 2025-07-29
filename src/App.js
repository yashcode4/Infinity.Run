import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Game from './components/Game';
import Scoreboard from './components/Scoreboard';
import Rules from './components/Rules';
import About from './components/About';
import Footer from './components/Footer';

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// STEP 1: Wrap the app with <Router> to enable routing system
function App() {
  return (
    <Router>
      {/* All routing logic is handled inside MainApp component */}
      <MainApp />
    </Router>
  );
}

// STEP 2: This component handles routing and layout logic
function MainApp() {
  const location = useLocation(); // Get the current route path (e.g., "/Game")
  const isGamePage = location.pathname === "/Game"; // Check if the current path is "/Game"

  return (
    <div className="app">

      {/* Navbar and Footer stay the same on all pages */}
      <Navbar />

      {/* Game component is always mounted (not inside <Routes>)
          But it's hidden when you're not on the "/Game" route.
          This prevents it from reloading/resetting when switching pages. */}
      <div style={{ display: isGamePage ? "flex" : "none", flex: 1 }}>
        <Game />
      </div>

      {/* All other pages are handled inside <Routes>
          Components inside <Routes> are mounted/unmounted when route changes */}
      {!isGamePage && (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Scoreboard" element={<Scoreboard />} />
          <Route path="/Rules" element={<Rules />} />
          <Route path="/About" element={<About />} />
        </Routes>
      )}

      {/* Footer is shown on all pages */}
      <Footer />
    </div>
  );
}

export default App;