import React from 'react';
import { Minus, Plus } from 'lucide-react';

export const QuantitySelector = ({
  quantity = 1,
  onChange,
  min = 1,
  max = 99,
  size = 'md',
  disabled = false,
}) => {
  const handleDecrement = (e) => {
    e.preventDefault();
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };

  const handleIncrement = (e) => {
    e.preventDefault();
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  const handleInputChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      const clamped = Math.max(min, Math.min(max, val));
      onChange(clamped);
    }
  };

  const isSmall = size === 'sm';

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        border: '1.5px solid var(--border-medium)',
        borderRadius: 'var(--radius-md)',
        backgroundColor: 'var(--bg-surface)',
        overflow: 'hidden',
      }}
      role="group"
      aria-label="Quantity selector"
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={disabled || quantity <= min}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isSmall ? '0.35rem 0.5rem' : '0.55rem 0.75rem',
          backgroundColor: 'transparent',
          color: quantity <= min ? 'var(--text-muted)' : 'var(--text-primary)',
          cursor: quantity <= min ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.15s ease',
        }}
        aria-label="Decrease quantity"
      >
        <Minus size={isSmall ? 14 : 16} />
      </button>

      <input
        type="number"
        value={quantity}
        onChange={handleInputChange}
        min={min}
        max={max}
        disabled={disabled}
        style={{
          width: isSmall ? '2.5rem' : '3.2rem',
          textAlign: 'center',
          border: 'none',
          background: 'transparent',
          fontWeight: '600',
          fontSize: isSmall ? '0.85rem' : '0.95rem',
          color: 'var(--text-primary)',
          outline: 'none',
          MozAppearance: 'textfield',
        }}
        aria-label="Current quantity"
      />

      <button
        type="button"
        onClick={handleIncrement}
        disabled={disabled || quantity >= max}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isSmall ? '0.35rem 0.5rem' : '0.55rem 0.75rem',
          backgroundColor: 'transparent',
          color: quantity >= max ? 'var(--text-muted)' : 'var(--text-primary)',
          cursor: quantity >= max ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.15s ease',
        }}
        aria-label="Increase quantity"
      >
        <Plus size={isSmall ? 14 : 16} />
      </button>
    </div>
  );
};

export default QuantitySelector;

