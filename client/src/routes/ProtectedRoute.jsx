import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const userInfo = localStorage.getItem('userInfo');
  
  if (!userInfo) {
    // User is not authenticated
    return <Navigate to="/login" />;
  }
  
  return children;
};

export default ProtectedRoute;
