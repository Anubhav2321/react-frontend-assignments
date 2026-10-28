import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div
      className="container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '65vh',
        textAlign: 'center',
        padding: '3rem 1rem',
      }}
    >
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: 'var(--primary-50)',
          color: 'var(--primary-600)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem',
        }}
      >
        <Compass size={40} strokeWidth={1.75} />
      </div>

      <span
        style={{
          fontSize: '4.5rem',
          fontWeight: 900,
          lineHeight: 1,
          color: 'var(--primary-600)',
          letterSpacing: '-0.05em',
          marginBottom: '0.5rem',
        }}
      >
        404
      </span>

      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
        Page Not Found
      </h1>

      <p style={{ color: 'var(--text-secondary)', maxWidth: '440px', lineHeight: 1.6, marginBottom: '2rem' }}>
        The page you are looking for doesn't exist, has been moved, or is temporarily unavailable. Let's get you back on track.
      </p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/" className="btn btn-primary btn-md">
          <Home size={16} />
          <span>Return Home</span>
        </Link>
        <Link to="/products" className="btn btn-secondary btn-md">
          <ArrowLeft size={16} />
          <span>Explore Catalog</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

