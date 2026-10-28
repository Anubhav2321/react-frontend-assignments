import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../app/hooks.js';
import { selectIsAuthenticated, selectAuthInitialized } from '../features/auth/authSlice.js';

export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isInitialized = useAppSelector(selectAuthInitialized);
  const location = useLocation();

  if (!isInitialized) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <div className="spinner" />
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Verifying session...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;

