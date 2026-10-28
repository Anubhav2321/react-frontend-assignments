import axios from 'axios';
import { apiClient } from './client.js';

const FAKESTORE_BASE = import.meta.env.VITE_FAKESTORE_URL || 'https://fakestoreapi.com';
export const USD_TO_INR_RATE = 85;

// Mapping for known legacy FakeStoreAPI jpg URLs to updated working png URLs
const FAKESTORE_URL_FIXES = {
  '81fPKd-2AYL._AC_SL1500_.jpg': '81fPKd-2AYL._AC_SL1500_t.png',
  '71-3HjGNDUL._AC_SY879._SX._UX._SY._UT_.jpg': '71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png',
  '71li-ujtlUL._AC_UX679_.jpg': '71li-ujtlUL._AC_UX679_t.png',
  '71YXzeOuslL._AC_UY879_.jpg': '71YXzeOuslL._AC_UY879_t.png',
  '71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg': '71pWzhdJNwL._AC_UL640_QL65_ML3_t.png',
  '61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg': '61sbMiUnoGL._AC_UL640_QL65_ML3_t.png',
  '71YAIFU48IL._AC_UL640_QL65_ML3_.jpg': '71YAIFU48IL._AC_UL640_QL65_ML3_t.png',
  '51UDEzFqFUC._AC_UL640_QL65_ML3_.jpg': '51UDEzMJVpL._AC_UL640_QL65_ML3_t.png',
  '61IBBVJvSDL._AC_SY879_.jpg': '61IBBVJvSDL._AC_SY879_t.png',
  '61U7T1koQqL._AC_SX679_.jpg': '61U7T1koQqL._AC_SX679_t.png',
  '71kWymZ+c+L._AC_SX679_.jpg': '71kWymZ+c+L._AC_SX679_t.png',
  '61mtL65D4cL._AC_SX679_.jpg': '61mtL65D4cL._AC_SX679_t.png',
  '81QpkIctqPL._AC_SX679_.jpg': '81QpkIctqPL._AC_SX679_t.png',
  '81Zt42ioCgL._AC_SX679_.jpg': '81Zt42ioCgL._AC_SX679_t.png',
  '51Y5NI-I5jL._AC_UX679_.jpg': '51Y5NI-I5jL._AC_UX679_t.png',
  '81XH0e8fefL._AC_UY879_.jpg': '81XH0e8fefL._AC_UY879_t.png',
  '71HblAHs5xL._AC_UY879_-2.jpg': '71HblAHs5xL._AC_UY879_-2t.png',
  '71z3kpMAYUL._AC_UY879_.jpg': '71z3kpMAYsL._AC_UY879_t.png',
  '51eg55uWmdL._AC_UX679_.jpg': '51eg55uWmdL._AC_UX679_t.png',
  '61pHAEJ4NML._AC_UX679_.jpg': '61pHAEJ4NML._AC_UX679_t.png',
};

export const sanitizeProductImage = (url, category = '') => {
  if (!url || typeof url !== 'string') {
    return 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80';
  }

  let sanitized = url.trim();

  if (sanitized.includes('fakestoreapi.com/img/')) {
    for (const [oldName, newName] of Object.entries(FAKESTORE_URL_FIXES)) {
      if (sanitized.includes(oldName)) {
        sanitized = sanitized.replace(oldName, newName);
        break;
      }
    }
    if (sanitized.endsWith('.jpg')) {
      sanitized = sanitized.replace(/\.jpg$/, '_t.png');
    }
  }

  return sanitized;
};

/**
 * Normalizes a raw product object ensuring safe defaults in Indian Rupees (INR / ₹)
 */
export const normalizeProduct = (item) => {
  if (!item) return null;

  // If already in INR (> 500 typically, or converted from backend), use directly; otherwise multiply by rate
  let price = Number(item.price) || 0;
  if (price < 1000 && !item.isINRConverted) {
    price = Number((price * USD_TO_INR_RATE).toFixed(2));
  }

  return {
    id: item.id,
    title: item.title || 'Untitled Product',
    price,
    isINRConverted: true,
    description: item.description || '',
    category: item.category || 'General',
    image: sanitizeProductImage(item.image, item.category),
    rating: {
      rate: Number(item.rating?.rate) || 4.0,
      count: Number(item.rating?.count) || 50,
    },
  };
};

/**
 * Fetches all products. Attempts Fake Store API directly first.
 * If blocked/times out, seamlessly falls back to backend catalog proxy.
 */
export const fetchAllProducts = async () => {
  try {
    const res = await axios.get(`${FAKESTORE_BASE}/products`, { timeout: 4000 });
    if (Array.isArray(res.data) && res.data.length > 0) {
      return res.data.map(normalizeProduct);
    }
  } catch (err) {
    console.warn(`[ProductAPI] External catalog fetch failed (${err.message}). Falling back to backend proxy.`);
  }

  // Fallback to backend catalogue (already in INR)
  const backendRes = await apiClient.get('/products');
  return (backendRes.data.products || []).map(normalizeProduct);
};

/**
 * Fetches a single product by ID with fallback
 */
export const fetchProductById = async (id) => {
  try {
    const res = await axios.get(`${FAKESTORE_BASE}/products/${id}`, { timeout: 4000 });
    if (res.data && res.data.id) {
      return normalizeProduct(res.data);
    }
  } catch (err) {
    console.warn(`[ProductAPI] External product detail fetch failed (${err.message}). Falling back to backend proxy.`);
  }

  const backendRes = await apiClient.get(`/products/${id}`);
  return normalizeProduct(backendRes.data.product);
};

/**
 * Fetches categories with fallback
 */
export const fetchCategories = async () => {
  try {
    const res = await axios.get(`${FAKESTORE_BASE}/products/categories`, { timeout: 4000 });
    if (Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    }
  } catch (err) {
    console.warn(`[ProductAPI] External categories fetch failed (${err.message}). Falling back to backend proxy.`);
  }

  const backendRes = await apiClient.get('/products/categories');
  return backendRes.data.categories || [];
};
