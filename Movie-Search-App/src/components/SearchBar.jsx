import { Search, X } from 'lucide-react';

export default function SearchBar({ query, setQuery }) {
  const handleClear = () => {
    setQuery('');
  };

  return (
    <div className="search-container">
      <Search className="search-icon" size={20} />
      <input
        type="text"
        className="search-input"
        placeholder="Search for movies, series, episodes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && (
        <button 
          className="search-clear" 
          onClick={handleClear}
          aria-label="Clear search"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
}
