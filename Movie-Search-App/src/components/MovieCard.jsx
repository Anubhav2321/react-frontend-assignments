import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { isFavorite, addFavorite, removeFavorite } from '../utils/storage';

export default function MovieCard({ movie }) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(movie.imdbID));
  }, [movie.imdbID]);

  const toggleFavorite = (e) => {
    e.preventDefault(); // Prevent navigating to movie details
    
    if (favorite) {
      removeFavorite(movie.imdbID);
      setFavorite(false);
    } else {
      addFavorite(movie);
      setFavorite(true);
    }
    
    // Dispatch custom event to update navbar badge
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  return (
    <Link to={`/movie/${movie.imdbID}`} className="movie-card">
      <button 
        className={`fav-btn ${favorite ? 'active' : ''}`} 
        onClick={toggleFavorite}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart size={18} fill={favorite ? "currentColor" : "none"} />
      </button>
      
      <div className="poster-container">
        {movie.Poster && movie.Poster !== "N/A" ? (
          <img 
            src={movie.Poster} 
            alt={`${movie.Title} poster`} 
            className="poster-image"
            loading="lazy"
          />
        ) : (
          <div className="no-poster">
            <span style={{ fontSize: '2rem' }}>🎬</span>
            <span>No Poster</span>
          </div>
        )}
      </div>
      
      <div className="card-content">
        <h3 className="movie-title" title={movie.Title}>{movie.Title}</h3>
        <div className="movie-meta">
          <span>{movie.Year}</span>
          <span style={{ textTransform: 'capitalize' }}>{movie.Type}</span>
        </div>
      </div>
    </Link>
  );
}
