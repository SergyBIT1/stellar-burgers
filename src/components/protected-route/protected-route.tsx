import { Preloader } from '@ui';
import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';

import { ReactElement } from 'react';

export type TProtectedRouteProps = {
  isAuthOnly?: boolean;
  children?: ReactElement;
};

export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  isAuthOnly = false,
  children
}) => {
  const { isAuthChecked, userData } = useSelector((state) => state.user);

  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (isAuthOnly && userData) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!isAuthOnly && !userData) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
