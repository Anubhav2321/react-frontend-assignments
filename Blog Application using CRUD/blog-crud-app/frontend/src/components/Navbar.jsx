import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Moon, Sun, Search } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import './Navbar.css';

const Navbar = ({ onSearchFocus }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar glass">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">
          <BookOpen className="brand-icon" size={24} />
          <span className="brand-text">BlogSphere</span>
        </Link>
        
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/create" className="nav-link nav-btn btn-primary">Create Blog</Link>
        </div>
        
        <div className="navbar-actions">
          {onSearchFocus && (
            <button className="icon-btn search-btn" onClick={onSearchFocus} aria-label="Search">
              <Search size={20} />
            </button>
          )}
          <button className="icon-btn theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
