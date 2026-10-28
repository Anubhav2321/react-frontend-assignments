import { describe, it, expect } from 'vitest';
import cartReducer, {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  selectCartItemCount,
  selectCartSubtotal,
  selectCartEstimatedShipping,
  selectCartEstimatedTax,
  selectCartEstimatedTotal,
} from '../features/cart/cartSlice.js';

describe('Redux cartSlice unit tests', () => {
  const sampleProduct1 = {
    id: 1,
    title: 'Modern Backpack',
    price: 50.0,
    image: 'backpack.jpg',
    category: "men's clothing",
  };

  const sampleProduct2 = {
    id: 2,
    title: 'Gold Watch',
    price: 80.0,
    image: 'watch.jpg',
    category: 'jewelery',
  };

  it('should return initial state with empty items array', () => {
    const state = cartReducer(undefined, { type: 'unknown' });
    expect(state.items).toEqual([]);
  });

  it('should add a new product to the cart with default quantity 1', () => {
    const state = cartReducer(undefined, addToCart({ product: sampleProduct1 }));
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual({
      id: 1,
      title: 'Modern Backpack',
      price: 50.0,
      image: 'backpack.jpg',
      category: "men's clothing",
      quantity: 1,
    });
  });

  it('should increment quantity when adding an existing item', () => {
    let state = cartReducer(undefined, addToCart({ product: sampleProduct1, quantity: 2 }));
    state = cartReducer(state, addToCart({ product: sampleProduct1, quantity: 3 }));

    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(5);
  });

  it('should update quantity correctly and prevent quantity below 1', () => {
    let state = cartReducer(undefined, addToCart({ product: sampleProduct1, quantity: 2 }));

    state = cartReducer(state, updateQuantity({ id: 1, quantity: 4 }));
    expect(state.items[0].quantity).toBe(4);

    // Attempting invalid 0 or negative quantity should be rejected
    state = cartReducer(state, updateQuantity({ id: 1, quantity: 0 }));
    expect(state.items[0].quantity).toBe(4);

    state = cartReducer(state, updateQuantity({ id: 1, quantity: -2 }));
    expect(state.items[0].quantity).toBe(4);
  });

  it('should remove item by ID from cart', () => {
    let state = cartReducer(undefined, addToCart({ product: sampleProduct1 }));
    state = cartReducer(state, addToCart({ product: sampleProduct2 }));
    expect(state.items).toHaveLength(2);

    state = cartReducer(state, removeFromCart(1));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe(2);
  });

  it('should clear all items from the cart', () => {
    let state = cartReducer(undefined, addToCart({ product: sampleProduct1 }));
    state = cartReducer(state, addToCart({ product: sampleProduct2 }));

    state = cartReducer(state, clearCart());
    expect(state.items).toEqual([]);
  });

  describe('Cart Memoized Selectors', () => {
    it('should calculate accurate count, subtotal, shipping, tax, and total', () => {
      // 1 Backpack (₹500) + 1 Watch (₹800) = Subtotal ₹1,300 (Over ₹999 -> Free Delivery!)
      const stateWithItems = {
        cart: {
          items: [
            { id: 1, price: 500.0, quantity: 1 },
            { id: 2, price: 800.0, quantity: 1 },
          ],
        },
      };

      expect(selectCartItemCount(stateWithItems)).toBe(2);
      expect(selectCartSubtotal(stateWithItems)).toBe(1300.0);
      expect(selectCartEstimatedShipping(stateWithItems)).toBe(0.0); // Free shipping over 999
      expect(selectCartEstimatedTax(stateWithItems)).toBe(65.0); // 5% of 1300 = 65.00
      expect(selectCartEstimatedTotal(stateWithItems)).toBe(1365.0);
    });

    it('should charge ₹99 delivery for orders under ₹999', () => {
      const stateSmallOrder = {
        cart: {
          items: [{ id: 1, price: 500.0, quantity: 1 }],
        },
      };

      expect(selectCartSubtotal(stateSmallOrder)).toBe(500.0);
      expect(selectCartEstimatedShipping(stateSmallOrder)).toBe(99.0);
      expect(selectCartEstimatedTax(stateSmallOrder)).toBe(25.0); // 5% of 500 = 25.00
      expect(selectCartEstimatedTotal(stateSmallOrder)).toBe(624.0);
    });

    it('should calculate zero for completely empty cart', () => {
      const emptyState = { cart: { items: [] } };
      expect(selectCartItemCount(emptyState)).toBe(0);
      expect(selectCartSubtotal(emptyState)).toBe(0);
      expect(selectCartEstimatedShipping(emptyState)).toBe(0);
      expect(selectCartEstimatedTax(emptyState)).toBe(0);
      expect(selectCartEstimatedTotal(emptyState)).toBe(0);
    });
  });
});

