import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/AuthContext';

const PublicRoute: React.FC = () => {
  const { role, isAuthLoaded } = useAuth();

  if (!isAuthLoaded) return <div>Loading...</div>;

  return role ? <Navigate to="/admin" replace /> : <Outlet />;
};

export default PublicRoute;
