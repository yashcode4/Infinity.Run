import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Game from './components/Game';
import Scoreboard from './components/Scoreboard';
import Rules from './components/Rules';
import About from './components/About';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/Game" element={<Game />}></Route>
          <Route exact path="/Scoreboard" element={<Scoreboard />}></Route>
          <Route exact path="/Rules" element={<Rules />}></Route>
          <Route exact path="/About" element={<About />}></Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
