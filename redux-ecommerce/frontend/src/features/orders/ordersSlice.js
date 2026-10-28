import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createOrder as apiCreateOrder,
  getUserOrders as apiGetUserOrders,
  getOrderById as apiGetOrderById,
} from '../../api/orderApi.js';

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderPayload, { rejectWithValue }) => {
    try {
      const data = await apiCreateOrder(orderPayload);
      return data.order;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to submit order');
    }
  }
);

export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiGetUserOrders();
      return data.orders;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to load order history');
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (orderId, { rejectWithValue }) => {
    try {
      const data = await apiGetOrderById(orderId);
      return data.order;
    } catch (err) {
      return rejectWithValue(err.message || `Failed to load order #${orderId}`);
    }
  }
);

const initialState = {
  orders: [],
  currentOrder: null,
  createdOrder: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  createStatus: 'idle',
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearCreatedOrder: (state) => {
      state.createdOrder = null;
      state.createStatus = 'idle';
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // createOrder
      .addCase(createOrder.pending, (state) => {
        state.createStatus = 'loading';
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.createStatus = 'succeeded';
        state.createdOrder = action.payload;
        state.orders.unshift(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.createStatus = 'failed';
        state.error = action.payload;
      })
      // fetchUserOrders
      .addCase(fetchUserOrders.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // fetchOrderById
      .addCase(fetchOrderById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearCreatedOrder, clearCurrentOrder } = ordersSlice.actions;

export const selectOrders = (state) => state.orders.orders;
export const selectCurrentOrder = (state) => state.orders.currentOrder;
export const selectCreatedOrder = (state) => state.orders.createdOrder;
export const selectOrdersStatus = (state) => state.orders.status;
export const selectOrderCreateStatus = (state) => state.orders.createStatus;
export const selectOrdersError = (state) => state.orders.error;

export default ordersSlice.reducer;

