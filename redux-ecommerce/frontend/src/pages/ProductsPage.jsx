import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  SlidersHorizontal,
  Search,
  RotateCcw,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../app/hooks.js';
import {
  fetchProducts,
  fetchCategories,
  selectFilteredAndSortedProducts,
  selectProductsStatus,
  selectProductsError,
  selectCategories,
  selectProductFilters,
  setSearchTerm,
  setSelectedCategory,
  setMinPrice,
  setMaxPrice,
  setSortBy,
  resetFilters,
} from '../features/products/productsSlice.js';
import ProductGrid from '../components/products/ProductGrid.jsx';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';

export const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const products = useAppSelector(selectFilteredAndSortedProducts);
  const status = useAppSelector(selectProductsStatus);
  const error = useAppSelector(selectProductsError);
  const categories = useAppSelector(selectCategories);
  const filters = useAppSelector(selectProductFilters);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter drawer toggle for mobile
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  // URL query sync
  useEffect(() => {
    const catQuery = searchParams.get('category');
    const searchParam = searchParams.get('search');
    if (catQuery) {
      dispatch(setSelectedCategory(catQuery));
    }
    if (searchParam) {
      dispatch(setSearchTerm(searchParam));
    }
  }, [searchParams, dispatch]);

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const totalPages = Math.ceil(products.length / itemsPerPage) || 1;
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleReset = () => {
    dispatch(resetFilters());
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <Breadcrumbs items={[{ label: 'Catalog', path: '/products' }]} />

      {/* Header bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Curated Products
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem' }}>
            Showing {products.length} {products.length === 1 ? 'item' : 'items'} matching your selection
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <button
          type="button"
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="btn btn-secondary mobile-filter-btn"
          style={{ display: 'none' }}
        >
          <SlidersHorizontal size={16} />
          <span>Filters & Sort</span>
        </button>
      </div>

      {/* Error state with retry */}
      {status === 'failed' && (
        <div
          style={{
            backgroundColor: 'var(--danger-bg)',
            color: 'var(--danger-text)',
            border: '1px solid var(--danger-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '2rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <AlertCircle size={24} />
            <div>
              <p style={{ fontWeight: 600 }}>Failed to load catalogue products</p>
              <p style={{ fontSize: '0.85rem' }}>{error || 'Network error connecting to catalog'}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => dispatch(fetchProducts())}
            className="btn btn-sm btn-primary"
          >
            Retry Request
          </button>
        </div>
      )}

      {/* Main Layout: Filters sidebar + Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          gap: '2.5rem',
          alignItems: 'start',
        }}
        className="catalog-layout"
      >
        {/* Filters Sidebar */}
        <aside
          className={`filters-sidebar ${mobileFiltersOpen ? 'open' : ''}`}
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.75rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Filters
            </h3>
            <button
              type="button"
              onClick={handleReset}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontSize: '0.8rem',
                color: 'var(--primary-600)',
                fontWeight: 600,
              }}
              title="Reset all filters"
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          </div>

          {/* Search Input */}
          <div>
            <label className="form-label">Search Keywords</label>
            <div style={{ position: 'relative' }}>
              <Search
                size={16}
                style={{
                  position: 'absolute',
                  left: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                }}
              />
              <input
                type="text"
                placeholder="Title, description..."
                value={filters.searchTerm}
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                className="form-input"
                style={{ paddingLeft: '2.25rem', fontSize: '0.875rem' }}
              />
            </div>
          </div>

          {/* Categories */}
          <div>
            <label className="form-label">Category</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <button
                type="button"
                onClick={() => dispatch(setSelectedCategory('all'))}
                style={{
                  textAlign: 'left',
                  padding: '0.45rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.875rem',
                  fontWeight: filters.selectedCategory === 'all' ? 700 : 500,
                  backgroundColor: filters.selectedCategory === 'all' ? 'var(--primary-50)' : 'transparent',
                  color: filters.selectedCategory === 'all' ? 'var(--primary-700)' : 'var(--text-secondary)',
                  transition: 'background-color 0.15s ease',
                }}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => dispatch(setSelectedCategory(cat))}
                  style={{
                    textAlign: 'left',
                    padding: '0.45rem 0.75rem',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.875rem',
                    fontWeight: filters.selectedCategory === cat ? 700 : 500,
                    textTransform: 'capitalize',
                    backgroundColor: filters.selectedCategory === cat ? 'var(--primary-50)' : 'transparent',
                    color: filters.selectedCategory === cat ? 'var(--primary-700)' : 'var(--text-secondary)',
                    transition: 'background-color 0.15s ease',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div>
            <label className="form-label">Sort Order</label>
            <select
              value={filters.sortBy}
              onChange={(e) => dispatch(setSortBy(e.target.value))}
              className="form-select"
              style={{ fontSize: '0.875rem' }}
            >
              <option value="featured">Featured / Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Highest Customer Rating</option>
              <option value="name-asc">Alphabetical: A - Z</option>
              <option value="name-desc">Alphabetical: Z - A</option>
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="form-label">
              Price Range: ₹{filters.minPrice} - ₹{filters.maxPrice.toLocaleString('en-IN')}
            </label>
            <input
              type="range"
              min="0"
              max="100000"
              step="500"
              value={filters.maxPrice}
              onChange={(e) => dispatch(setMaxPrice(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--primary-600)', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <span>₹0</span>
              <span>₹50,000</span>
              <span>₹1,00,000+</span>
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <ProductGrid
            products={paginatedProducts}
            loading={status === 'loading'}
            skeletonCount={8}
            onResetFilters={handleReset}
          />

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginTop: '1.5rem',
              }}
            >
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="btn btn-secondary btn-sm"
                aria-label="Previous page"
              >
                <ChevronLeft size={16} />
                <span>Previous</span>
              </button>

              <div style={{ display: 'flex', gap: '0.25rem' }}>
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pageNum = idx + 1;
                  const isActive = currentPage === pageNum;

                  return (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => setCurrentPage(pageNum)}
                      className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-secondary'}`}
                      style={{
                        minWidth: '36px',
                        height: '36px',
                        padding: 0,
                      }}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="btn btn-secondary btn-sm"
                aria-label="Next page"
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .catalog-layout {
            grid-template-columns: 1fr !important;
          }
          .mobile-filter-btn {
            display: inline-flex !important;
          }
          .filters-sidebar {
            display: none !important;
          }
          .filters-sidebar.open {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductsPage;

