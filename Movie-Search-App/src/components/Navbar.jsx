import { Link, useLocation } from 'react-router-dom';
import { Film, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getFavorites } from '../utils/storage';

export default function Navbar() {
  const location = useLocation();
  const [favoritesCount, setFavoritesCount] = useState(0);

  // Update favorites count by listening to custom event or checking interval
  // For a simple college project, we can check it when location changes
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
  }, [location]); // Also update when navigation changes just in case

  return (
    <nav className="glass-nav">
      <div className="container navbar-content">
        <Link to="/" className="brand">
          <Film className="icon" size={28} color="var(--accent-color)" />
          <span>CineGlass</span>
        </Link>
        
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/favorites" 
            className={`nav-link ${location.pathname === '/favorites' ? 'active' : ''}`}
          >
            <Heart size={18} />
            <span>Favorites</span>
            {favoritesCount > 0 && (
              <span className="favorites-badge">{favoritesCount}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
