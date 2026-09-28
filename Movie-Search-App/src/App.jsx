import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favorites';

function App() {
  return (
    <Router>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:imdbId" element={<MovieDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          {/* 404 Route */}
          <Route path="*" element={
            <div className="empty-state" style={{ paddingTop: '8rem' }}>
              <h3>Page Not Found</h3>
              <p>Looks like this scene doesn't exist.</p>
              <a href="/" className="btn-primary">Back to Home</a>
            </div>
          } />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
