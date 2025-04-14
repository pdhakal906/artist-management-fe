import React from 'react';
import { Navigate, Outlet } from 'react-router';
import useAuthStore from '../features/store';

const PublicRoute: React.FC = () => {

  const { user, isLoading } = useAuthStore();

  return user?.role ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRoute;
