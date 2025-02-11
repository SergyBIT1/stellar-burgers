import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectProfileOrders,
  getProfileOrders
} from '../../services/slices/profileOrderSlice/profileOrderSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  /** TODO: взял переменную из стора */
  const orders: TOrder[] = useSelector(selectProfileOrders);

  useEffect(() => {
    dispatch(getProfileOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
