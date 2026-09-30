import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { History, Trash2, Wand2 } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';
import { getHistory, clearHistory } from '../utils/storage';
import { searchMovies, getRandomMovieId } from '../api';
import { useDebounce } from '../hooks/useDebounce';

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const initialQuery = searchParams.get('query') || '';
  const initialPage = parseInt(searchParams.get('page')) || 1;
  const initialCategory = searchParams.get('category') || 'All';

  const [query, setQuery] = useState(initialQuery);
  // Use debounced query for API calls to prevent sending request on every keystroke
  const debouncedQuery = useDebounce(query, 500);
  
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(initialPage);
  const [category, setCategory] = useState(initialCategory);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Flag to know if we are showing default movies or search results
  const [isDefaultSearch, setIsDefaultSearch] = useState(true);
  const [history, setHistory] = useState([]);

  // Load history on mount
  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };

  // Remove isFirstRender and useEffect as they cause issues in Strict Mode

  // Sync state to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedQuery) params.set('query', debouncedQuery);
    if (page > 1) params.set('page', page.toString());
    if (category !== 'All') params.set('category', category);
    
    setSearchParams(params, { replace: true });
  }, [debouncedQuery, page, category, setSearchParams]);

  useEffect(() => {
    const fetchMovies = async () => {
      // Determine what to search for
      const searchQuery = debouncedQuery.trim(); 
      const isDefault = !debouncedQuery.trim() && category === 'All';
      
      setIsDefaultSearch(isDefault);
      setLoading(true);
      setError('');
      
      try {
        const data = await searchMovies(searchQuery, page, category);
        
        if (data && data.Response === 'True') {
          setMovies(data.Search);
          setTotalResults(parseInt(data.totalResults, 10));
        } else {
          setMovies([]);
          setTotalResults(0);
          setError(data ? (data.Error || 'No movies found.') : 'No movies found.');
        }
      } catch (err) {
        setMovies([]);
        setTotalResults(0);
        setError('Something went wrong while searching. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [debouncedQuery, page, category]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    // Smooth scroll to top of results
    window.scrollTo({
      top: document.getElementById('results-section').offsetTop - 100,
      behavior: 'smooth'
    });
  };

  return (
    <div>
      <section className="hero">
        <h1>Discover Your Next Favorite Movie</h1>
        <p>Search thousands of movies, series, and episodes to explore ratings, posters, and details.</p>
        <SearchBar 
          query={query} 
          setQuery={(newQuery) => {
            setQuery(newQuery);
            setPage(1);
          }} 
        />
        <div style={{ marginTop: '1.5rem' }}>
          <button 
            className="btn-surprise glass-panel"
            onClick={() => {
              const randomId = getRandomMovieId();
              navigate(`/movie/${randomId}`);
            }}
          >
            <Wand2 size={18} />
            <span>Surprise Me</span>
          </button>
        </div>
      </section>

      {history.length > 0 && isDefaultSearch && (
        <section className="history-section">
          <div className="history-header">
            <h2 className="history-title">
              <History size={24} color="var(--accent-color)" />
              Recently Viewed
            </h2>
            <button className="clear-history-btn" onClick={handleClearHistory} title="Clear history">
              <Trash2 size={16} style={{ display: 'inline', marginBottom: '-3px' }} /> Clear
            </button>
          </div>
          <div className="history-carousel">
            {history.map(movie => (
              <div key={movie.imdbID} className="history-card-wrapper">
                <Link to={`/movie/${movie.imdbID}`} className="history-card">
                  {movie.Poster && movie.Poster !== 'N/A' ? (
                    <img src={movie.Poster} alt={movie.Title} className="history-poster" loading="lazy" />
                  ) : (
                    <div className="history-poster no-poster">
                      <span>🎬</span>
                    </div>
                  )}
                  <div className="history-info">
                    <div className="history-title-text" title={movie.Title}>{movie.Title}</div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      <section id="results-section">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem', justifyContent: 'center' }}>
          {['All', 'Bollywood', 'Hollywood', 'Action', 'Drama', 'Sci-Fi'].map(cat => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                setPage(1);
              }}
              className="page-btn"
              style={{
                background: category === cat ? 'var(--accent-color)' : '',
                color: category === cat ? 'white' : '',
                borderColor: category === cat ? 'var(--accent-color)' : ''
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <h2 style={{ marginBottom: '1.5rem', fontWeight: 600 }}>
          {isDefaultSearch ? 'Popular Movies' : `Results for ${debouncedQuery ? `"${debouncedQuery}"` : ''} ${category !== 'All' ? `(${category})` : ''}`}
        </h2>

        {loading ? (
          <Loading count={10} />
        ) : error && !isDefaultSearch ? (
          <EmptyState 
            title="No movies found" 
            message={error}
            actionText="Clear Search"
            onActionClick={() => setQuery('')}
          />
        ) : (
          <>
            <div className="movie-grid">
              {movies.map(movie => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
            
            {movies.length > 0 && (
              <Pagination 
                currentPage={page} 
                totalResults={totalResults} 
                onPageChange={handlePageChange} 
              />
            )}
          </>
        )}
      </section>
    </div>
  );
}
