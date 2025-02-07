import { Preloader } from '@ui';
import { FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getUserState } from '../../services/slices/userSlice/userSlice';
import { ReactElement } from 'react';
import React from 'react';

type TProtectedRouteProps = {
  isAuthOnly?: boolean;
  children?: React.ReactNode;
};

export const ProtectedRoute: React.FC<TProtectedRouteProps> = ({
  isAuthOnly = false,
  children
}) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const location = useLocation();

  if (!isAuthenticated) {
    return <Preloader />;
  }

  if (isAuthOnly && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!isAuthOnly && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
