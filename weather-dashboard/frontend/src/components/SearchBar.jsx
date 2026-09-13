import { useState } from 'react';

const MAX_HISTORY = 8;

export default function SearchBar({ onSearch, onLocate, searchHistory = [], onRemoveHistory }) {
  const [city, setCity] = useState('');
  const [locating, setLocating] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    onSearch(city.trim());
    setCity('');
  };

  const handleLocate = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocating(false);
        if (onLocate) {
          onLocate(position.coords.latitude, position.coords.longitude);
        }
      },
      () => {
        setLocating(false);
        alert('Unable to retrieve your location');
      }
    );
  };

  return (
    <div className="search-section">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          id="city-search-input"
          placeholder="Search for a city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="search-input"
          autoComplete="off"
        />
        <button
          type="button"
          className={`locate-button ${locating ? 'pulse-glow' : ''}`}
          title="Use Current Location"
          onClick={handleLocate}
          disabled={locating}
          id="locate-btn"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </button>
        <button
          type="submit"
          className="search-button"
          title="Search"
          id="search-btn"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </button>
      </form>

      {searchHistory.length > 0 && (
        <div className="search-history">
          {searchHistory.slice(0, MAX_HISTORY).map((item) => (
            <button
              key={item}
              className="history-chip"
              onClick={() => onSearch(item)}
              title={`Search ${item}`}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              {item}
              <span
                className="remove-chip"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveHistory?.(item);
                }}
                title="Remove"
              >
                ×
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}