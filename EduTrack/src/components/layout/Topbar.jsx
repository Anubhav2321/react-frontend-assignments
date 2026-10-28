import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  Calendar,
  ShieldAlert,
  Bell,
  Search,
} from 'lucide-react';
import { useAppSelector } from '../../app/hooks';
import { selectAttendanceThreshold } from '../../features/preferences/preferencesSlice';
import { selectLowAttendanceStudents } from '../../selectors/attendanceSelectors';

const PAGE_TITLES = {
  '/': 'Academic Dashboard',
  '/students': 'Student Directory',
  '/attendance': 'Class Attendance Management',
  '/subjects': 'Curriculum & Course Catalog',
  '/reports': 'Attendance Analytics & Auditing',
  '/settings': 'System Settings & Thresholds',
};

export const Topbar = ({ onToggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentThreshold = useAppSelector(selectAttendanceThreshold);
  const lowStudents = useAppSelector(selectLowAttendanceStudents);
  const currentTitle = PAGE_TITLES[location.pathname] || 'AttendEase';

  // Support custom profile image with multi-extension fallback: jpg -> png -> svg -> initials
  const [profileSrcIndex, setProfileSrcIndex] = useState(0);
  const profileSources = ['/profile.jpg', '/profile.png', '/profile.svg'];

  const handleImgError = () => {
    if (profileSrcIndex < profileSources.length - 1) {
      setProfileSrcIndex((prev) => prev + 1);
    } else {
      setProfileSrcIndex(-1); // show initials AS
    }
  };

  // Format today's date
  const todayDateFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="sidebar-toggle-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <Menu size={18} />
        </button>
        <div>
          <h1 className="page-title">{currentTitle}</h1>
        </div>
      </div>

      <div className="topbar-right">
        {/* Quick Search Shortcut Pill */}
        <div
          onClick={() => navigate('/students')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.32rem 0.75rem',
            backgroundColor: 'var(--slate-100)',
            border: '1px solid var(--slate-200)',
            borderRadius: 'var(--radius-full)',
            color: 'var(--slate-500)',
            fontSize: '0.78rem',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
          title="Click to search students roster"
        >
          <Search size={13} />
          <span>Quick Find</span>
          <kbd
            style={{
              backgroundColor: '#fff',
              border: '1px solid var(--slate-300)',
              borderRadius: '4px',
              padding: '1px 5px',
              fontSize: '0.65rem',
              fontWeight: 700,
              color: 'var(--slate-600)',
              boxShadow: '0 1px 1px rgba(0,0,0,0.05)',
            }}
          >
            ⌘K
          </kbd>
        </div>

        {/* Date Capsule */}
        <div className="topbar-capsule" title="Official Academic System Date">
          <Calendar size={13} color="#6366f1" />
          <span>{todayDateFormatted}</span>
        </div>

        {/* Threshold Policy Capsule */}
        <div
          className="topbar-capsule"
          style={{
            backgroundColor: '#fffbeb',
            borderColor: '#fde68a',
            color: '#b45309',
          }}
          title="Campus Attendance Warning Floor"
        >
          <ShieldAlert size={13} />
          <span>Floor: {currentThreshold}%</span>
        </div>

        {/* Notifications Button */}
        <button
          type="button"
          onClick={() => navigate('/reports')}
          style={{
            position: 'relative',
            background: 'var(--slate-50)',
            border: '1px solid var(--slate-200)',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--slate-600)',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
          title={
            lowStudents.length > 0
              ? `${lowStudents.length} students below ${currentThreshold}% attendance`
              : 'No attendance alerts'
          }
          aria-label="Attendance Alerts"
        >
          <Bell size={15} />
          {lowStudents.length > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                width: '15px',
                height: '15px',
                backgroundColor: '#ef4444',
                color: '#fff',
                fontSize: '0.62rem',
                fontWeight: 800,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #fff',
                boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
              }}
            >
              {lowStudents.length}
            </span>
          )}
        </button>

        {/* User Profile Badge: Anubhav Samanta */}
        <div className="topbar-user-badge" title="Logged in as Anubhav Samanta (Dean of Academics)">
          {profileSrcIndex >= 0 ? (
            <img
              src={profileSources[profileSrcIndex]}
              alt="Anubhav Samanta"
              onError={handleImgError}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1.5px solid var(--primary-500)',
                display: 'block',
              }}
            />
          ) : (
            <div className="topbar-user-avatar">AS</div>
          )}
          <div style={{ lineHeight: 1.15, paddingRight: '0.25rem' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--slate-800)' }}>
              Anubhav Samanta
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--slate-500)', fontWeight: 600 }}>
              Dean of Academics
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
