import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import productsReducer from '../features/products/productsSlice.js';
import cartReducer from '../features/cart/cartSlice.js';
import authReducer from '../features/auth/authSlice.js';
import ordersReducer from '../features/orders/ordersSlice.js';
import preferencesReducer from '../features/preferences/preferencesSlice.js';
import { actionLoggerMiddleware } from './loggerMiddleware.js';

// Root reducer
const rootReducer = combineReducers({
  products: productsReducer,
  cart: persistReducer({ key: 'shopsphere_cart', storage }, cartReducer),
  preferences: persistReducer({ key: 'shopsphere_prefs', storage }, preferencesReducer),
  auth: authReducer, // Never persist auth credentials or tokens in localStorage
  orders: ordersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(actionLoggerMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

