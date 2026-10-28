import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MainLayout from '../components/layout/MainLayout.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

import HomePage from '../pages/HomePage.jsx';
import ProductsPage from '../pages/ProductsPage.jsx';
import ProductDetailPage from '../pages/ProductDetailPage.jsx';
import CartPage from '../pages/CartPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import RegisterPage from '../pages/RegisterPage.jsx';
import CheckoutPage from '../pages/CheckoutPage.jsx';
import OrderConfirmationPage from '../pages/OrderConfirmationPage.jsx';
import AccountPage from '../pages/AccountPage.jsx';
import OrderHistoryPage from '../pages/OrderHistoryPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Public Routes */}
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:id" element={<ProductDetailPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        {/* Protected Routes (Requires Authenticated Session) */}
        <Route
          path="checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="order-confirmation"
          element={
            <ProtectedRoute>
              <OrderConfirmationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="account"
          element={
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="orders"
          element={
            <ProtectedRoute>
              <OrderHistoryPage />
            </ProtectedRoute>
          }
        />

        {/* 404 Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

