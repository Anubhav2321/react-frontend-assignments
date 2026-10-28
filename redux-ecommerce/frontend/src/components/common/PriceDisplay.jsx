import React from 'react';

export const PriceDisplay = ({ price, className = '', size = 'md' }) => {
  const numericPrice = typeof price === 'number' ? price : parseFloat(price) || 0;

  // Indian locale currency formatting
  const formattedString = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericPrice);

  const [whole, cents] = formattedString.split('.');

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base font-semibold',
    lg: 'text-2xl font-bold',
    xl: 'text-3xl font-extrabold',
  }[size] || 'text-base font-semibold';

  return (
    <span
      className={`price-display ${sizeClasses} ${className}`}
      style={{ display: 'inline-flex', alignItems: 'baseline', fontFeatureSettings: '"tnum"' }}
      aria-label={`₹${formattedString}`}
    >
      <span style={{ fontSize: '0.85em', marginRight: '2px', fontWeight: 700, opacity: 0.9 }}>₹</span>
      <span style={{ fontWeight: 'bold' }}>{whole}</span>
      <span style={{ fontSize: '0.75em', opacity: 0.85 }}>.{cents}</span>
    </span>
  );
};

export default PriceDisplay;
