import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if user is logged in
api.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo');
    
    if (userInfo) {
      const { token } = JSON.parse(userInfo);
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Menu API endpoints
export const menuApi = {
  getMenuItems: (category) => {
    return api.get(`/menu${category ? `?category=${category}` : ''}`);
  },
  getMenuItem: (id) => {
    return api.get(`/menu/${id}`);
  },
  createMenuItem: (menuData) => {
    return api.post('/menu', menuData);
  },
  updateMenuItem: (id, menuData) => {
    return api.put(`/menu/${id}`, menuData);
  },
  deleteMenuItem: (id) => {
    return api.delete(`/menu/${id}`);
  },
};

// Order API endpoints
export const orderApi = {
  createOrder: (orderData) => {
    return api.post('/orders', orderData);
  },
  getMyOrders: () => {
    return api.get('/orders/myorders');
  },
  getOrderById: (id) => {
    return api.get(`/orders/${id}`);
  },
  getAllOrders: () => {
    return api.get('/orders');
  },
  updateOrderStatus: (id, status) => {
    return api.put(`/orders/${id}/status`, { status });
  },
};

// User API endpoints
export const userApi = {
  login: (email, password) => {
    return api.post('/users/login', { email, password });
  },
  register: (userData) => {
    return api.post('/users/register', userData);
  },
  getProfile: () => {
    return api.get('/users/profile');
  },
  updateProfile: (userData) => {
    return api.put('/users/profile', userData);
  },
};

export default api;
