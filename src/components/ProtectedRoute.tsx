import React from 'react';
import { Navigate, Outlet } from 'react-router';
import useAuthStore from '../features/store';

interface ProtectedRouteProps {
  allowedRoles: Array<'super_admin' | 'artist_manager' | 'artist'>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user } = useAuthStore();

  if (!allowedRoles.includes(user?.role)) return <Navigate to="/unauthorized" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
