// components/AdminProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('userRole');

  if (!token || role !== 'admin') {
    return <Navigate to="/adminLogin" replace />;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
