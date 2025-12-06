// Authentication utilities
export const authUtils = {
  // Save authentication data
  setAuth: (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userRole', user.role);
    localStorage.setItem('isAuthenticated', 'true');
  },

  // Get authentication token
  getToken: () => {
    return localStorage.getItem('token');
  },

  // Get current user
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Get user role
  getRole: () => {
    return localStorage.getItem('userRole');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return localStorage.getItem('isAuthenticated') === 'true' && authUtils.getToken();
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    localStorage.removeItem('isAuthenticated');
  },

  // Check if user has specific role
  hasRole: (role) => {
    return authUtils.getRole() === role;
  }
};










