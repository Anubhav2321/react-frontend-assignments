import React from 'react';

export const LoadingSkeleton = ({ rows = 5 }) => {
  return (
    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          style={{
            height: '2rem',
            backgroundColor: 'var(--slate-200)',
            borderRadius: 'var(--radius-sm)',
            opacity: 0.6,
            animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }}
        />
      ))}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.25; }
        }
      `}</style>
    </div>
  );
};

export default LoadingSkeleton;

