import { apiClient } from './client.js';

export const createOrder = async (orderPayload) => {
  const response = await apiClient.post('/orders', orderPayload);
  return response.data;
};

export const getUserOrders = async () => {
  const response = await apiClient.get('/orders');
  return response.data;
};

export const getOrderById = async (orderId) => {
  const response = await apiClient.get(`/orders/${orderId}`);
  return response.data;
};

