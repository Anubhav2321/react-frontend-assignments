import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  pageSize = 10,
  onPageChange,
}) => {
  if (totalPages <= 1 && totalItems <= pageSize) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.85rem 1.25rem',
        borderTop: '1px solid var(--slate-200)',
        fontSize: '0.85rem',
        color: 'var(--slate-600)',
        flexWrap: 'wrap',
        gap: '0.5rem',
      }}
    >
      <div>
        Showing <strong style={{ color: 'var(--slate-900)' }}>{startItem}</strong> to{' '}
        <strong style={{ color: 'var(--slate-900)' }}>{endItem}</strong> of{' '}
        <strong style={{ color: 'var(--slate-900)' }}>{totalItems}</strong> entries
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
          <span>Previous</span>
        </button>
        <span style={{ padding: '0 0.5rem', fontWeight: 600 }}>
          {currentPage} / {totalPages || 1}
        </span>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Next page"
        >
          <span>Next</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;

