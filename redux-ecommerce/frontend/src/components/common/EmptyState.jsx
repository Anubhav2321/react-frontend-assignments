import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export const EmptyState = ({
  icon: Icon = ShoppingBag,
  title = 'Nothing here yet',
  description = 'Explore our catalog to find premium products you will love.',
  actionText = 'Start Shopping',
  actionLink = '/products',
  onAction = null,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 1.5rem',
        textAlign: 'center',
        backgroundColor: 'var(--bg-surface)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-sm)',
        maxWidth: '560px',
        margin: '2rem auto',
      }}
    >
      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          backgroundColor: 'var(--primary-50)',
          color: 'var(--primary-600)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem',
        }}
      >
        <Icon size={36} strokeWidth={1.75} />
      </div>

      <h3
        style={{
          fontSize: '1.35rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: '0.5rem',
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontSize: '0.95rem',
          color: 'var(--text-secondary)',
          maxWidth: '400px',
          marginBottom: '1.75rem',
          lineHeight: 1.5,
        }}
      >
        {description}
      </p>

      {onAction ? (
        <button onClick={onAction} className="btn btn-primary btn-md">
          {actionText}
        </button>
      ) : (
        <Link to={actionLink} className="btn btn-primary btn-md">
          {actionText}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;

