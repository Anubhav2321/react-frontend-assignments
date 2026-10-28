import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Array of { id, title, price, image, category, quantity }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const validQuantity = Math.max(1, parseInt(quantity, 10) || 1);

      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += validQuantity;
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: Number(product.price) || 0,
          image: product.image || '',
          category: product.category || 'General',
          quantity: validQuantity,
        });
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const validQuantity = parseInt(quantity, 10);

      // Guard: Never allow quantity below 1. If 0 or negative, remove item or clamp to 1
      if (!Number.isInteger(validQuantity) || validQuantity < 1) {
        return;
      }

      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = validQuantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

// Base selectors
export const selectCartItems = (state) => state.cart.items;

// Memoized derived selectors
export const selectCartItemCount = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartSubtotal = createSelector([selectCartItems], (items) =>
  Number(items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2))
);

export const selectCartEstimatedShipping = createSelector([selectCartSubtotal], (subtotal) => {
  if (subtotal === 0) return 0;
  return subtotal >= 999 ? 0 : 99.0;
});

export const selectCartEstimatedTax = createSelector([selectCartSubtotal], (subtotal) =>
  Number((subtotal * 0.05).toFixed(2))
);

export const selectCartEstimatedTotal = createSelector(
  [selectCartSubtotal, selectCartEstimatedShipping, selectCartEstimatedTax],
  (subtotal, shipping, tax) => Number((subtotal + shipping + tax).toFixed(2))
);

export default cartSlice.reducer;

