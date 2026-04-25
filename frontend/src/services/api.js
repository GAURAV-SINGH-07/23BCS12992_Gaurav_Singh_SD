
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// ─── Product APIs ────────────────────────────
export const getProducts = (params) => api.get('/products', { params });
export const getProductById = (id) => api.get(`/products/${id}`);
export const getCategories = () => api.get('/products/categories');

// ─── Cart APIs ───────────────────────────────
export const getCart = () => api.get('/cart');
export const getCartCount = () => api.get('/cart/count');
export const addToCart = (product_id, quantity = 1) =>
  api.post('/cart', { product_id, quantity });
export const updateCartItem = (id, quantity) =>
  api.put(`/cart/${id}`, { quantity });
export const removeFromCart = (id) => api.delete(`/cart/${id}`);
export const clearCart = () => api.delete('/cart');

// ─── Order APIs ──────────────────────────────
export const placeOrder = (shippingData) => api.post('/orders', shippingData);
export const getOrders = () => api.get('/orders');
export const getOrderById = (id) => api.get(`/orders/${id}`);

export default api;