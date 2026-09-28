import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Clock, Calendar } from 'lucide-react';
import { getMovieDetails } from '../api';
import { isFavorite, addFavorite, removeFavorite } from '../utils/storage';
import Loading from '../components/Loading';

export default function MovieDetails() {
  const { imdbId } = useParams();
  const navigate = useNavigate();
  
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError('');
      
      try {
        const data = await getMovieDetails(imdbId);
        
        if (data.Response === 'True') {
          setMovie(data);
          setFavorite(isFavorite(data.imdbID));
        } else {
          setError(data.Error || 'Movie not found.');
        }
      } catch (err) {
        setError('Failed to fetch movie details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
    
    // Scroll to top when opening details
    window.scrollTo(0, 0);
  }, [imdbId]);

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(movie.imdbID);
      setFavorite(false);
    } else {
      addFavorite({
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Poster: movie.Poster,
        Type: movie.Type
      });
      setFavorite(true);
    }
    
    // Dispatch event to update navbar badge
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  if (loading) {
    return (
      <div className="movie-details-page">
        <Loading count={1} />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="empty-state" style={{ paddingTop: '5rem' }}>
        <h3>Error</h3>
        <p>{error}</p>
        <button className="btn-primary" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="movie-details-page">
      <Link to="/" onClick={(e) => { e.preventDefault(); navigate(-1); }} className="back-link">
        <ArrowLeft size={18} />
        <span>Back to results</span>
      </Link>

      <div className="details-grid">
        <div className="details-poster-container">
          {movie.Poster && movie.Poster !== 'N/A' ? (
            <img src={movie.Poster} alt={movie.Title} className="details-poster" />
          ) : (
            <div className="details-poster no-poster glass-panel" style={{ aspectRatio: '2/3' }}>
              <span style={{ fontSize: '3rem' }}>🎬</span>
              <span>No Poster Available</span>
            </div>
          )}
        </div>

        <div className="details-content">
          <div className="details-header">
            <h1 className="details-title">{movie.Title}</h1>
            
            <div className="details-meta">
              <span className="meta-tag">{movie.Rated}</span>
              <div className="meta-item">
                <Calendar size={16} />
                <span>{movie.Year}</span>
              </div>
              <div className="meta-item">
                <Clock size={16} />
                <span>{movie.Runtime}</span>
              </div>
              <div className="meta-item">
                <span>{movie.Genre}</span>
              </div>
            </div>
            
            <div className="details-actions">
              <button 
                className={`btn-primary ${favorite ? 'active' : ''}`}
                onClick={toggleFavorite}
                style={{ 
                  background: favorite ? 'var(--glass-bg)' : 'var(--text-primary)',
                  color: favorite ? 'var(--accent-color)' : 'var(--bg-color)',
                  border: favorite ? '1px solid var(--glass-border)' : 'none'
                }}
              >
                <Heart size={20} fill={favorite ? "currentColor" : "none"} />
                <span>{favorite ? 'Remove from Favorites' : 'Add to Favorites'}</span>
              </button>
            </div>
          </div>

          <div className="plot-section">
            <h3>Plot Summary</h3>
            <p className="plot-text">{movie.Plot !== 'N/A' ? movie.Plot : 'No plot available for this movie.'}</p>
          </div>

          <div className="ratings-grid">
            {movie.Ratings && movie.Ratings.map((rating, index) => (
              <div key={index} className="rating-card glass-panel">
                <div className="rating-source">{rating.Source}</div>
                <div className="rating-value">{rating.Value}</div>
              </div>
            ))}
            
            {(!movie.Ratings || movie.Ratings.length === 0) && movie.imdbRating !== 'N/A' && (
              <div className="rating-card glass-panel">
                <div className="rating-source">IMDb Rating</div>
                <div className="rating-value">{movie.imdbRating} / 10</div>
              </div>
            )}
          </div>

          <div className="info-grid">
            <div className="info-group">
              <div className="info-label">Director</div>
              <div className="info-value">{movie.Director}</div>
            </div>
            
            <div className="info-group">
              <div className="info-label">Writers</div>
              <div className="info-value">{movie.Writer}</div>
            </div>
            
            <div className="info-group">
              <div className="info-label">Actors</div>
              <div className="info-value">{movie.Actors}</div>
            </div>
            
            <div className="info-group">
              <div className="info-label">Language</div>
              <div className="info-value">{movie.Language}</div>
            </div>
            
            <div className="info-group">
              <div className="info-label">Country</div>
              <div className="info-value">{movie.Country}</div>
            </div>
            
            <div className="info-group">
              <div className="info-label">Awards</div>
              <div className="info-value">{movie.Awards !== 'N/A' ? movie.Awards : 'None'}</div>
            </div>
            
            {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
              <div className="info-group">
                <div className="info-label">Box Office</div>
                <div className="info-value">{movie.BoxOffice}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
