import React from 'react';
import { BarChart3 } from 'lucide-react';
import EmptyState from './EmptyState';

export const ChartCard = ({
  title,
  subtitle,
  children,
  action,
  isEmpty = false,
  emptyMessage = 'No attendance activity recorded for this visualization.',
  minHeight = 300,
}) => {
  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid var(--slate-200)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}
      >
        <div>
          <h3
            style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: 'var(--slate-900)',
              letterSpacing: '-0.01em',
            }}
          >
            {title}
          </h3>
          {subtitle && (
            <p style={{ fontSize: '0.78rem', color: 'var(--slate-500)', marginTop: '0.15rem' }}>
              {subtitle}
            </p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>

      <div style={{ flex: 1, minHeight, width: '100%', position: 'relative' }}>
        {isEmpty ? (
          <EmptyState
            icon={BarChart3}
            title="No chart data available"
            description={emptyMessage}
          />
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default ChartCard;

