import { Preloader } from '@ui';
import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '@store';

import React from 'react';
import {
  getUserCheckSelector,
  getUserSelector
} from '../../services/slices/userSlice/userSlice';

type TProtectedRouteProps = {
  isAuthOnly?: boolean;
  children?: React.ReactNode;
};

export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  isAuthOnly = false,
  children
}) => {
  const isUserCheck = useSelector(getUserCheckSelector);
  const user = useSelector(getUserSelector);

  const location = useLocation();

  if (!isUserCheck) {
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
