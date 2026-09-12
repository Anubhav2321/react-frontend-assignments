import { useState } from 'react';

export default function SearchBar({ onSearch, onLocate }) {
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
      (error) => {
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
          placeholder="Search for a city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="search-input"
        />
        <button
          type="button"
          className={`locate-button ${locating ? 'pulse-glow' : ''}`}
          title="Current Location"
          onClick={handleLocate}
          disabled={locating}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </button>
        <button
          type="submit"
          className="search-button"
          title="Search"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </button>
      </form>
    </div>
  );
}