import { describe, it, expect } from 'vitest';
import productsReducer, {
  setSearchTerm,
  setSelectedCategory,
  setSortBy,
  resetFilters,
  selectFilteredAndSortedProducts,
} from '../features/products/productsSlice.js';

describe('Redux productsSlice & Memoized Selectors', () => {
  const sampleProducts = [
    { id: 1, title: 'Denim Jacket', price: 60, category: "men's clothing", rating: { rate: 4.5 } },
    { id: 2, title: 'Leather Backpack', price: 120, category: "men's clothing", rating: { rate: 4.8 } },
    { id: 3, title: 'Silver Ring', price: 25, category: 'jewelery', rating: { rate: 3.8 } },
    { id: 4, title: 'Wireless Headphones', price: 199, category: 'electronics', rating: { rate: 4.2 } },
  ];

  const buildMockState = (filterOverrides = {}) => ({
    products: {
      ids: [1, 2, 3, 4],
      entities: {
        1: sampleProducts[0],
        2: sampleProducts[1],
        3: sampleProducts[2],
        4: sampleProducts[3],
      },
      filters: {
        searchTerm: '',
        selectedCategory: 'all',
        minPrice: 0,
        maxPrice: 1000,
        sortBy: 'featured',
        ...filterOverrides,
      },
    },
  });

  it('should return all products when default filters are active', () => {
    const state = buildMockState();
    const result = selectFilteredAndSortedProducts(state);
    expect(result).toHaveLength(4);
  });

  it('should filter products by category', () => {
    const state = buildMockState({ selectedCategory: 'jewelery' });
    const result = selectFilteredAndSortedProducts(state);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Silver Ring');
  });

  it('should filter products by search keyword match', () => {
    const state = buildMockState({ searchTerm: 'denim' });
    const result = selectFilteredAndSortedProducts(state);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Denim Jacket');
  });

  it('should sort products by price ascending', () => {
    const state = buildMockState({ sortBy: 'price-asc' });
    const result = selectFilteredAndSortedProducts(state);
    expect(result.map((p) => p.price)).toEqual([25, 60, 120, 199]);
  });

  it('should sort products by price descending', () => {
    const state = buildMockState({ sortBy: 'price-desc' });
    const result = selectFilteredAndSortedProducts(state);
    expect(result.map((p) => p.price)).toEqual([199, 120, 60, 25]);
  });

  it('should sort products by customer rating descending', () => {
    const state = buildMockState({ sortBy: 'rating-desc' });
    const result = selectFilteredAndSortedProducts(state);
    expect(result[0].rating.rate).toBe(4.8);
    expect(result[0].title).toBe('Leather Backpack');
  });

  it('should handle action reducers correctly', () => {
    let state = productsReducer(undefined, setSearchTerm('Watch'));
    expect(state.filters.searchTerm).toBe('Watch');

    state = productsReducer(state, setSelectedCategory('electronics'));
    expect(state.filters.selectedCategory).toBe('electronics');

    state = productsReducer(state, setSortBy('price-asc'));
    expect(state.filters.sortBy).toBe('price-asc');

    state = productsReducer(state, resetFilters());
    expect(state.filters.searchTerm).toBe('');
    expect(state.filters.selectedCategory).toBe('all');
    expect(state.filters.sortBy).toBe('featured');
  });
});

