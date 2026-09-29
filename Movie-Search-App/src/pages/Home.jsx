import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';
import { searchMovies } from '../api';
import { useDebounce } from '../hooks/useDebounce';

export default function Home() {
  const [query, setQuery] = useState('');
  // Use debounced query for API calls to prevent sending request on every keystroke
  const debouncedQuery = useDebounce(query, 500);
  
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('All');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Flag to know if we are showing default movies or search results
  const [isDefaultSearch, setIsDefaultSearch] = useState(true);

  // Reset page when debounced query or category changes
  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, category]);

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
        <SearchBar query={query} setQuery={setQuery} />
      </section>

      <section id="results-section">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem', justifyContent: 'center' }}>
          {['All', 'Bollywood', 'Hollywood', 'Action', 'Drama', 'Sci-Fi'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
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
