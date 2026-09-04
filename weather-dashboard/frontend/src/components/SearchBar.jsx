import { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setCity('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      style={{
        display: 'flex',
        width: '100%',
        marginBottom: '2rem',
        position: 'relative'
      }}
    >
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search for a city (e.g. Kolkata, London)"
        style={{
          width: '100%',
          padding: '1rem 3rem 1rem 1.5rem',
          fontSize: '1.1rem',
          borderRadius: '9999px',
          border: '1px solid var(--card-border)',
          background: 'var(--input-bg)',
          color: 'var(--text-color)',
          outline: 'none',
          backdropFilter: 'blur(8px)',
          transition: 'all 0.3s ease',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--primary-color)';
          e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.2)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'var(--card-border)';
          e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.05)';
        }}
      />
      <button 
        type="submit"
        aria-label="Search"
        style={{
          position: 'absolute',
          right: '8px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'var(--primary-color)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'background-color 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-hover)'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-color)'}
      >
        <Search size={20} />
      </button>
    </form>
  );
};

export default SearchBar;
