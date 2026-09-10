import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

const SearchBar = ({ onSearch, onLocate }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setCity('');
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="search-input"
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search city (e.g. London)"
      />
      
      {/* Current Location Button */}
      <button 
        type="button" 
        className="locate-button"
        onClick={onLocate}
        title="Use Current Location"
      >
        <MapPin size={20} />
      </button>

      {/* Search Button */}
      <button type="submit" className="search-button" aria-label="Search">
        <Search size={20} />
      </button>
    </form>
  );
};

export default SearchBar;
