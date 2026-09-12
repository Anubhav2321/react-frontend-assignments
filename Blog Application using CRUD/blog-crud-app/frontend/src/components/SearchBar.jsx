import React, { forwardRef } from 'react';
import { Search } from 'lucide-react';
import './SearchBar.css';

const SearchBar = forwardRef(({ searchQuery, setSearchQuery }, ref) => {
  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <Search className="search-icon" size={20} />
        <input
          ref={ref}
          type="text"
          className="search-input form-control"
          placeholder="Search by title, author, or content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
});

export default SearchBar;
