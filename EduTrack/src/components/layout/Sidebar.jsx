import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  BookOpen,
  BarChart3,
  Settings,
  GraduationCap,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export const Sidebar = ({ isCollapsed, isMobileOpen, onCloseMobile }) => {
  const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/students', label: 'Students', icon: Users },
    { to: '/attendance', label: 'Attendance', icon: CalendarCheck },
    { to: '/subjects', label: 'Subjects', icon: BookOpen },
    { to: '/reports', label: 'Reports', icon: BarChart3 },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            zIndex: 35,
            backdropFilter: 'blur(4px)',
          }}
        />
      )}
      <aside
        className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${
          isMobileOpen ? 'mobile-open' : ''
        }`}
      >
        <div className="sidebar-header">
          <NavLink to="/" className="brand-badge" onClick={onCloseMobile}>
            <div className="brand-icon">
              <GraduationCap size={22} />
            </div>
            <div>
              <span className="brand-name">AttendEase</span>
              <div
                style={{
                  fontSize: '0.62rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#818cf8',
                  fontWeight: 700,
                  marginTop: '-2px',
                }}
                className="brand-name"
              >
                Campus Edition
              </div>
            </div>
          </NavLink>
        </div>

        <div className="nav-section-title">Navigation</div>

        <ul className="nav-links">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.to} className="nav-item">
                <NavLink
                  to={item.to}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                  onClick={onCloseMobile}
                  end={item.to === '/'}
                >
                  <Icon size={19} />
                  <span className="nav-text">{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>

        <div className="sidebar-footer">
          <div className="academic-badge">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 700 }}>
              <ShieldCheck size={15} color="#818cf8" />
              <span>Institutional Grade</span>
            </div>
            <p style={{ marginTop: '0.35rem', opacity: 0.8, fontSize: '0.7rem', lineHeight: 1.4 }}>
              Redux Toolkit state layer with verified persistence.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
