import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Centralized Axios client configured with credentials for HTTP-only cookies
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Always include cookies in cross-origin requests
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Response interceptor for consistent error messaging
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = 'An unexpected network error occurred.';
    if (error.response) {
      message = error.response.data?.message || `Request failed with status ${error.response.status}`;
    } else if (error.request) {
      message = 'Could not connect to the server. Please check your internet connection or ensure the backend is running.';
    }
    return Promise.reject(new Error(message));
  }
);

