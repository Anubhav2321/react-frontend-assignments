import React from 'react';

export const ProductSkeleton = () => {
  return (
    <div
      className="card"
      style={{
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
      aria-hidden="true"
    >
      <div
        className="skeleton"
        style={{
          width: '100%',
          height: '220px',
          borderRadius: 'var(--radius-md)',
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="skeleton" style={{ width: '40%', height: '18px' }} />
        <div className="skeleton" style={{ width: '25%', height: '18px' }} />
      </div>
      <div className="skeleton" style={{ width: '85%', height: '20px' }} />
      <div className="skeleton" style={{ width: '60%', height: '20px' }} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 'auto',
          paddingTop: '0.5rem',
        }}
      >
        <div className="skeleton" style={{ width: '35%', height: '24px' }} />
        <div className="skeleton" style={{ width: '40%', height: '36px', borderRadius: 'var(--radius-md)' }} />
      </div>
    </div>
  );
};

export default ProductSkeleton;

