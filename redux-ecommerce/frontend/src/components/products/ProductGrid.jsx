import React from 'react';
import ProductCard from './ProductCard.jsx';
import ProductSkeleton from '../common/ProductSkeleton.jsx';
import EmptyState from '../common/EmptyState.jsx';
import { SearchX } from 'lucide-react';

export const ProductGrid = ({
  products = [],
  loading = false,
  skeletonCount = 8,
  onResetFilters = null,
}) => {
  if (loading) {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1.5rem',
          width: '100%',
        }}
        aria-busy="true"
        aria-label="Loading products"
      >
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <EmptyState
        icon={SearchX}
        title="No matching products found"
        description="Try adjusting your search terms, changing the category, or clearing filters."
        actionText="Reset All Filters"
        onAction={onResetFilters}
      />
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '1.5rem',
        width: '100%',
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;

