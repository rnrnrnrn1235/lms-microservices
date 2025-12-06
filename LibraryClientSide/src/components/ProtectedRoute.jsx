import React from 'react';
import { Navigate } from 'react-router-dom';
import { authUtils } from '../utils/auth';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const isAuthenticated = authUtils.isAuthenticated();
  const userRole = authUtils.getRole();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    // Redirect based on role
    if (userRole === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (userRole === 'librarian') {
      return <Navigate to="/librarian/dashboard" replace />;
    } else {
      return <Navigate to="/member/dashboard" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;










