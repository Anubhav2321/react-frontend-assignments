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
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Flag to know if we are showing default movies or search results
  const [isDefaultSearch, setIsDefaultSearch] = useState(true);

  // Reset page when debounced query changes
  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]);

  useEffect(() => {
    const fetchMovies = async () => {
      // Determine what to search for
      const searchQuery = debouncedQuery.trim() || 'Batman'; // Default to Batman if empty
      const isDefault = !debouncedQuery.trim();
      
      setIsDefaultSearch(isDefault);
      setLoading(true);
      setError('');
      
      try {
        const data = await searchMovies(searchQuery, page);
        
        if (data.Response === 'True') {
          setMovies(data.Search);
          setTotalResults(parseInt(data.totalResults, 10));
        } else {
          setMovies([]);
          setTotalResults(0);
          setError(data.Error || 'No movies found.');
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
  }, [debouncedQuery, page]);

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
        <h2 style={{ marginBottom: '1.5rem', fontWeight: 600 }}>
          {isDefaultSearch ? 'Popular Searches' : `Search Results for "${debouncedQuery}"`}
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
