import { Link, useLocation } from 'react-router-dom';
import { Film, Heart, Moon, Sun, Home } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getFavorites } from '../utils/storage';

export default function Navbar() {
  const location = useLocation();
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check local storage or system preference on load
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.removeAttribute('data-theme');
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  // Update favorites count by listening to custom event or checking interval
  useEffect(() => {
    const updateCount = () => {
      const favs = getFavorites();
      setFavoritesCount(favs.length);
    };
    
    updateCount();
    
    // Add event listener for custom event to update count instantly when changed in other components
    window.addEventListener('favoritesUpdated', updateCount);
    
    return () => {
      window.removeEventListener('favoritesUpdated', updateCount);
    };
  }, [location]);

  return (
    <nav className="glass-nav">
      <div className="container navbar-content">
        <Link to="/" className="brand">
          <Film className="icon" size={28} color="var(--accent-color)" />
          <span>CineGlass</span>
        </Link>
        
        <div className="nav-links">
          <button 
            className="theme-toggle" 
            onClick={toggleTheme} 
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            <Home size={18} />
            <span className="nav-text">Home</span>
          </Link>
          <Link 
            to="/favorites" 
            className={`nav-link ${location.pathname === '/favorites' ? 'active' : ''}`}
          >
            <Heart size={18} />
            <span className="nav-text">Favorites</span>
            {favoritesCount > 0 && (
              <span className="favorites-badge">{favoritesCount}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
