import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchAllProducts, fetchProductById as apiFetchProductById, fetchCategories as apiFetchCategories } from '../../api/productApi.js';

// Entity adapter for normalized product management
const productsAdapter = createEntityAdapter({
  selectId: (product) => product.id,
  sortComparer: (a, b) => a.id - b.id,
});

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchAllProducts();
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to load products');
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiFetchCategories();
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to load categories');
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await apiFetchProductById(id);
      return data;
    } catch (err) {
      return rejectWithValue(err.message || `Failed to load product ${id}`);
    }
  }
);

const initialState = productsAdapter.getInitialState({
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  categories: [],
  categoriesStatus: 'idle',
  currentProduct: null,
  currentProductStatus: 'idle',
  currentProductError: null,
  // Filtering & Sorting UI State
  filters: {
    searchTerm: '',
    selectedCategory: 'all',
    minPrice: 0,
    maxPrice: 100000,
    sortBy: 'featured', // 'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'rating-desc'
  },
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.filters.searchTerm = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.filters.selectedCategory = action.payload;
    },
    setMinPrice: (state, action) => {
      state.filters.minPrice = Number(action.payload) || 0;
    },
    setMaxPrice: (state, action) => {
      state.filters.maxPrice = Number(action.payload) || 100000;
    },
    setSortBy: (state, action) => {
      state.filters.sortBy = action.payload;
    },
    resetFilters: (state) => {
      state.filters = {
        searchTerm: '',
        selectedCategory: 'all',
        minPrice: 0,
        maxPrice: 100000,
        sortBy: 'featured',
      };
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
      state.currentProductStatus = 'idle';
      state.currentProductError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        productsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // fetchCategories
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesStatus = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesStatus = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.categoriesStatus = 'failed';
      })
      // fetchProductById
      .addCase(fetchProductById.pending, (state) => {
        state.currentProductStatus = 'loading';
        state.currentProductError = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.currentProductStatus = 'succeeded';
        state.currentProduct = action.payload;
        // Also ensure normalized state has this product
        if (action.payload) {
          productsAdapter.upsertOne(state, action.payload);
        }
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.currentProductStatus = 'failed';
        state.currentProductError = action.payload;
      });
  },
});

export const {
  setSearchTerm,
  setSelectedCategory,
  setMinPrice,
  setMaxPrice,
  setSortBy,
  resetFilters,
  clearCurrentProduct,
} = productsSlice.actions;

// Base entity selectors
const globalizedSelectors = productsAdapter.getSelectors((state) => state.products);

export const selectAllProducts = globalizedSelectors.selectAll;
export const selectProductById = globalizedSelectors.selectById;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;
export const selectCategories = (state) => state.products.categories;
export const selectCategoriesStatus = (state) => state.products.categoriesStatus;
export const selectProductFilters = (state) => state.products.filters;
export const selectCurrentProduct = (state) => state.products.currentProduct;
export const selectCurrentProductStatus = (state) => state.products.currentProductStatus;
export const selectCurrentProductError = (state) => state.products.currentProductError;

// Memoized derived selector: filtered and sorted products
export const selectFilteredAndSortedProducts = createSelector(
  [selectAllProducts, selectProductFilters],
  (products, filters) => {
    const { searchTerm, selectedCategory, minPrice, maxPrice, sortBy } = filters;

    let result = products.filter((item) => {
      // Category match
      if (selectedCategory && selectedCategory !== 'all') {
        if (item.category.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
      }

      // Search match
      if (searchTerm && searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase().trim();
        const titleMatch = item.title.toLowerCase().includes(query);
        const descMatch = item.description?.toLowerCase().includes(query);
        const catMatch = item.category.toLowerCase().includes(query);
        if (!titleMatch && !descMatch && !catMatch) {
          return false;
        }
      }

      // Price filter
      if (item.price < minPrice || item.price > maxPrice) {
        return false;
      }

      return true;
    });

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'rating-desc':
        result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
        break;
      case 'featured':
      default:
        // Keep standard order
        break;
    }

    return result;
  }
);

// Selector for featured / trending items
export const selectFeaturedProducts = createSelector(
  [selectAllProducts],
  (products) => products.slice(0, 4)
);

export const selectTrendingProducts = createSelector(
  [selectAllProducts],
  (products) => products.filter((p) => (p.rating?.rate || 0) >= 4.0).slice(0, 8)
);

export default productsSlice.reducer;

