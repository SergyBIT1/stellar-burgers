import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { getUserSelector } from '../../services/slices/userSlice/userSlice';

export const AppHeader: FC = () => {
  const data = useSelector(getUserSelector);
  return <AppHeaderUI userName={data?.name} />;
};
