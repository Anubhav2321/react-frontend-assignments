import React, { useContext, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Moon, Sun, User, Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';

const Layout = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard': return 'Dashboard';
      case '/tasks': return 'All Tasks';
      case '/tasks/completed': return 'Completed Tasks';
      case '/tasks/add': return 'Add New Task';
      default: 
        if (location.pathname.startsWith('/tasks/')) return 'Task Details';
        return 'Overview';
    }
  };

  return (
    <div className="app-layout">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="sidebar-overlay open" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="main-content">
        <header className="top-bar">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button 
              className="menu-toggle-btn" 
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open Menu"
            >
              <Menu size={24} />
            </button>
            <h1 className="page-title">{getPageTitle()}</h1>
          </div>
          
          <div className="user-actions">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="user-profile">
              <div className="avatar">
                {user?.name ? user.name.charAt(0).toUpperCase() : <User size={16} />}
              </div>
              <span style={{ fontWeight: 500, fontSize: '0.875rem' }}>{user?.name}</span>
            </div>
          </div>
        </header>
        
        <main style={{ flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
