import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';

import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import {
  getFeedState,
  getFeeds
} from '../../services/slices/feedSlice/feedSlice';

export const Feed: FC = () => {
  /** TODO: взял переменную из стора */
  const { orders, loading } = useSelector(getFeedState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeeds())} />;
};
