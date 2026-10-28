import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import PriceDisplay from '../components/common/PriceDisplay.jsx';
import QuantitySelector from '../components/common/QuantitySelector.jsx';
import ProductCard from '../components/products/ProductCard.jsx';
import SafeImage from '../components/common/SafeImage.jsx';
import ProtectedRoute from '../routes/ProtectedRoute.jsx';
import cartReducer from '../features/cart/cartSlice.js';
import authReducer from '../features/auth/authSlice.js';

describe('Frontend Component Tests', () => {
  describe('PriceDisplay', () => {
    it('should format float numbers with currency Rupee sign and decimals', () => {
      render(<PriceDisplay price={49.99} />);
      expect(screen.getByLabelText('₹49.99')).toBeInTheDocument();
      expect(screen.getByText('49')).toBeInTheDocument();
      expect(screen.getByText('.99')).toBeInTheDocument();
    });

    it('should handle round integer prices with two decimal digits (.00)', () => {
      render(<PriceDisplay price={100} />);
      expect(screen.getByLabelText('₹100.00')).toBeInTheDocument();
    });
  });

  describe('QuantitySelector', () => {
    it('should render current quantity and call onChange with incremented value', () => {
      const handleChange = vi.fn();
      render(<QuantitySelector quantity={3} onChange={handleChange} min={1} max={10} />);

      const increaseBtn = screen.getByLabelText('Increase quantity');
      fireEvent.click(increaseBtn);

      expect(handleChange).toHaveBeenCalledWith(4);
    });

    it('should disable decrement button when quantity reaches minimum (1)', () => {
      const handleChange = vi.fn();
      render(<QuantitySelector quantity={1} onChange={handleChange} min={1} max={10} />);

      const decreaseBtn = screen.getByLabelText('Decrease quantity');
      expect(decreaseBtn).toBeDisabled();

      fireEvent.click(decreaseBtn);
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('ProductCard', () => {
    const mockProduct = {
      id: 99,
      title: 'Ergonomic Executive Office Chair',
      price: 249.99,
      category: 'furniture',
      image: 'chair.jpg',
      rating: { rate: 4.8, count: 150 },
    };

    it('should render product title, price, category badge, and handle Add to Cart', () => {
      const store = configureStore({
        reducer: { cart: cartReducer },
      });

      render(
        <Provider store={store}>
          <BrowserRouter>
            <ProductCard product={mockProduct} />
          </BrowserRouter>
        </Provider>
      );

      expect(screen.getByText('Ergonomic Executive Office Chair')).toBeInTheDocument();
      expect(screen.getByText('furniture')).toBeInTheDocument();

      const addBtn = screen.getByLabelText('Add Ergonomic Executive Office Chair to cart');
      fireEvent.click(addBtn);

      // Verify that item was added to Redux cart
      const state = store.getState().cart;
      expect(state.items).toHaveLength(1);
      expect(state.items[0].id).toBe(99);
      expect(state.items[0].price).toBe(249.99);
    });
  });

  describe('ProtectedRoute', () => {
    it('should render protected child when user is authenticated', () => {
      const store = configureStore({
        reducer: { auth: authReducer },
        preloadedState: {
          auth: {
            isAuthenticated: true,
            isInitialized: true,
            user: { name: 'Alice' },
          },
        },
      });

      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/secret']}>
            <Routes>
              <Route
                path="/secret"
                element={
                  <ProtectedRoute>
                    <div>Secret Protected Area</div>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </MemoryRouter>
        </Provider>
      );

      expect(screen.getByText('Secret Protected Area')).toBeInTheDocument();
    });

    it('should redirect unauthenticated users to /login', () => {
      const store = configureStore({
        reducer: { auth: authReducer },
        preloadedState: {
          auth: {
            isAuthenticated: false,
            isInitialized: true,
            user: null,
          },
        },
      });

      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/checkout']}>
            <Routes>
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <div>Checkout Page</div>
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<div>Redirected to Login</div>} />
            </Routes>
          </MemoryRouter>
        </Provider>
      );

      expect(screen.getByText('Redirected to Login')).toBeInTheDocument();
      expect(screen.queryByText('Checkout Page')).not.toBeInTheDocument();
    });
  });

  describe('SafeImage', () => {
    it('should automatically upgrade legacy FakeStoreAPI .jpg URLs to working _t.png URLs', () => {
      render(
        <SafeImage
          src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
          alt="Backpack Test"
        />
      );
      const img = screen.getByAltText('Backpack Test');
      expect(img).toHaveAttribute('src', 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png');
      expect(img).toHaveAttribute('referrerPolicy', 'no-referrer');
    });

    it('should fall back to category fallback on image load error', () => {
      render(
        <SafeImage
          src="https://broken-image-link.test/fake.png"
          alt="Broken Test"
          category="electronics"
        />
      );
      const img = screen.getByAltText('Broken Test');
      fireEvent.error(img);
      expect(img.src).toContain('images.unsplash.com');
    });
  });
});

