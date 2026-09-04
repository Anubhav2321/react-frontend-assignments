import React from 'react';
import { Sun, Moon, UserPlus } from 'lucide-react';

const Header = ({ theme, toggleTheme, onAddClick }) => {
  return (
    <header className="header glass">
      <h1>Student Management System</h1>
      <div className="header-actions">
        <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle Theme">
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="btn-primary" onClick={onAddClick}>
          <UserPlus size={18} />
          Add Student
        </button>
      </div>
    </header>
  );
};

export default Header;
