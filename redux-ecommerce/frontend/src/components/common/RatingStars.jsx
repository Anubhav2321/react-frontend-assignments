import React from 'react';
import { Star } from 'lucide-react';

export const RatingStars = ({ rate = 0, count = null, size = 16 }) => {
  const rounded = Math.round((Number(rate) || 0) * 2) / 2; // Round to nearest 0.5

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.25rem',
      }}
      aria-label={`Rating: ${rate} out of 5 stars`}
    >
      <div style={{ display: 'flex', gap: '2px', color: '#eab308' }}>
        {[1, 2, 3, 4, 5].map((starIndex) => {
          const filled = rounded >= starIndex;
          const half = !filled && rounded >= starIndex - 0.5;

          return (
            <Star
              key={starIndex}
              size={size}
              fill={filled ? '#eab308' : half ? 'url(#half-star)' : 'none'}
              stroke="#eab308"
              strokeWidth={1.5}
            />
          );
        })}
      </div>

      <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-primary)', marginLeft: '0.2rem' }}>
        {Number(rate).toFixed(1)}
      </span>

      {count !== null && (
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          ({count})
        </span>
      )}
    </div>
  );
};

export default RatingStars;

