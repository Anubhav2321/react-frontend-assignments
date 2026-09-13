import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ListTodo, PlusSquare, CheckCircle, Moon, Sun } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import './Sidebar.css';

const Sidebar = ({ isOpen, closeMenu }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);



  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h1 className="logo-text">TaskPro</h1>
      </div>
      
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" onClick={closeMenu} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/tasks" end onClick={closeMenu} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <ListTodo size={20} />
          <span>All Tasks</span>
        </NavLink>
        <NavLink to="/tasks/new" onClick={closeMenu} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <PlusSquare size={20} />
          <span>Add Task</span>
        </NavLink>
        <NavLink to="/completed" onClick={closeMenu} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <CheckCircle size={20} />
          <span>Completed</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <button onClick={toggleTheme} className="theme-toggle-btn">
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>

      </div>
    </aside>
  );
};

export default Sidebar;
