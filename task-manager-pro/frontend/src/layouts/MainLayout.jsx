import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Menu } from 'lucide-react';

const MainLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="app-container">
      <Sidebar isOpen={isMobileMenuOpen} closeMenu={() => setIsMobileMenuOpen(false)} />
      <main className="main-content">
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          <Menu size={24} />
        </button>
        <Outlet />
      </main>
      
      {/* Overlay for mobile when sidebar is open */}
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={toggleMobileMenu}></div>
      )}
    </div>
  );
};

export default MainLayout;
