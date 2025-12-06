// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function for API calls
const apiCall = async (endpoint, method = 'GET', data = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  // Add token if available
  const token = localStorage.getItem('token');
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Something went wrong');
    }
    
    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Authentication APIs
export const authAPI = {
  login: (email, password) => apiCall('/auth/login', 'POST', { email, password }),
  register: (userData) => apiCall('/auth/register', 'POST', userData),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

// Users APIs
export const usersAPI = {
  getAll: () => apiCall('/users'),
  getById: (id) => apiCall(`/users/${id}`),
  create: (userData) => apiCall('/users', 'POST', userData),
  update: (id, userData) => apiCall(`/users/${id}`, 'PUT', userData),
  delete: (id) => apiCall(`/users/${id}`, 'DELETE')
};

// Books APIs
export const booksAPI = {
  getAll: () => apiCall('/books'),
  getById: (id) => apiCall(`/books/${id}`),
  search: (query) => apiCall(`/books/search?q=${encodeURIComponent(query)}`),
  create: (bookData) => apiCall('/books', 'POST', bookData),
  update: (id, bookData) => apiCall(`/books/${id}`, 'PUT', bookData),
  delete: (id) => apiCall(`/books/${id}`, 'DELETE')
};

// Borrow APIs
export const borrowAPI = {
  getAll: () => apiCall('/borrows'),
  getById: (id) => apiCall(`/borrows/${id}`),
  getByUser: (userId) => apiCall(`/borrows/user/${userId}`),
  issue: (borrowData) => apiCall('/borrows/issue', 'POST', borrowData),
  return: (id, returnData) => apiCall(`/borrows/${id}/return`, 'PUT', returnData),
  getOverdue: () => apiCall('/borrows/overdue')
};

// Reports APIs
export const reportsAPI = {
  getBorrowedBooks: () => apiCall('/reports/borrowed'),
  getOverdueBooks: () => apiCall('/reports/overdue'),
  getFines: () => apiCall('/reports/fines'),
  getBookAvailability: () => apiCall('/reports/availability')
};

export default {
  authAPI,
  usersAPI,
  booksAPI,
  borrowAPI,
  reportsAPI
};










