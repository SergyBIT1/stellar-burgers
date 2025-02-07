import { Preloader } from '@ui';
import { FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';

import React from 'react';

type TProtectedRouteProps = {
  isAuthOnly?: boolean;
  children?: React.ReactNode;
};

export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  isAuthOnly = false,
  children
}) => {
  const { isAuthenticated } = useSelector((state) => state.user);

  const location = useLocation();

  if (!isAuthenticated) {
    return <Preloader />;
  }

  if (isAuthOnly && isAuthenticated) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!isAuthOnly && !isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
