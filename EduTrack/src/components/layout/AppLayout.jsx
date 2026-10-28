import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export const AppLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleToggleSidebar = () => {
    if (window.innerWidth <= 768) {
      setIsMobileOpen((prev) => !prev);
    } else {
      setIsCollapsed((prev) => !prev);
    }
  };

  const handleCloseMobile = () => {
    setIsMobileOpen(false);
  };

  return (
    <div className="app-container">
      <Sidebar
        isCollapsed={isCollapsed}
        isMobileOpen={isMobileOpen}
        onCloseMobile={handleCloseMobile}
      />
      <div className={`main-wrapper ${isCollapsed ? 'expanded' : ''}`}>
        <Topbar onToggleSidebar={handleToggleSidebar} />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;

