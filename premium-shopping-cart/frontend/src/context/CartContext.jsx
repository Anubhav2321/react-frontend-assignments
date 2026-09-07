import React, { createContext, useReducer, useEffect } from 'react';
import { cartReducer } from './cartReducer';

export const CartContext = createContext();

const initialState = {
  items: [],
  discountPercentage: 0,
  couponCode: null
};

// Lazy initialization function to pull from localStorage
const init = (initialData) => {
  try {
    const localData = localStorage.getItem('cyberCartState');
    return localData ? JSON.parse(localData) : initialData;
  } catch (error) {
    console.error("Failed to load cart state", error);
    return initialData;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, init);

  // Persist state changes to localStorage
  useEffect(() => {
    localStorage.setItem('cyberCartState', JSON.stringify(state));
  }, [state]);

  const addToCart = (product) => dispatch({ type: 'ADD_TO_CART', payload: product });
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const increaseQty = (id) => dispatch({ type: 'INCREASE_QTY', payload: id });
  const decreaseQty = (id) => dispatch({ type: 'DECREASE_QTY', payload: id });
  const applyCoupon = (code, percentage) => dispatch({ type: 'APPLY_COUPON', payload: { code, percentage } });
  const removeCoupon = () => dispatch({ type: 'REMOVE_COUPON' });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  // Calculate totals
  const subtotal = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
  const discountAmount = (subtotal * state.discountPercentage) / 100;
  const subtotalAfterDiscount = subtotal - discountAmount;
  const gstAmount = (subtotalAfterDiscount * 18) / 100;
  const grandTotal = subtotalAfterDiscount + gstAmount;
  const totalItems = state.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        increaseQty,
        decreaseQty,
        applyCoupon,
        removeCoupon,
        clearCart,
        subtotal,
        discountAmount,
        gstAmount,
        grandTotal,
        totalItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
