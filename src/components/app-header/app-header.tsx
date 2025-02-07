import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { getUserState } from '../../services/slices/userSlice/userSlice';

export const AppHeader: FC = () => {
  const data = useSelector(getUserState).user;
  return <AppHeaderUI userName={data?.name} />;
};
