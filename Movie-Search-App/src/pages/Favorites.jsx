import { useState, useEffect } from 'react';
import { getFavorites } from '../utils/storage';
import MovieCard from '../components/MovieCard';
import EmptyState from '../components/EmptyState';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load favorites from local storage
    setFavorites(getFavorites());
    
    // Listen for updates from other components (like removing a favorite from the card)
    const handleFavoritesUpdate = () => {
      setFavorites(getFavorites());
    };
    
    window.addEventListener('favoritesUpdated', handleFavoritesUpdate);
    
    return () => {
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdate);
    };
  }, []);

  return (
    <div style={{ padding: '2rem 0' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>My Favorites</h1>
      
      {favorites.length > 0 ? (
        <div className="movie-grid">
          {favorites.map(movie => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <EmptyState 
          title="No favorites yet" 
          message="Start exploring movies and save the ones you love."
          actionText="Explore Movies"
          actionLink="/"
        />
      )}
    </div>
  );
}
