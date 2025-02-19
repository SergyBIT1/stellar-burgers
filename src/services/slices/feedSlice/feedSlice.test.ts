import { configureStore } from '@reduxjs/toolkit';
import { TFeedState } from './feedSlice';
import { getFeeds } from './feedSlice';
import feedReducer from './feedSlice';

type RootState = {
  feed: TFeedState;
};

// Группа тестов для среза состояния еды
describe('feedSlice', () => {
  let store: ReturnType<typeof configureStore<RootState>>;
  const initialState: TFeedState = {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false,
    error: null
  };

  // Перед каждым тестом будет создано новое хранилище
  beforeEach(() => {
    store = configureStore({ reducer: { feed: feedReducer } }); 
  });

  test('Проверка, что начальное состояние соответствует ожидаемому', () => {
    const result = store.getState().feed;
    expect(result).toEqual(initialState);
  });

  test('Тестируем обработку.pending при запросе еды', () => {
    store.dispatch(getFeeds.pending('testRequestId'));
    const result = store.getState().feed;
    expect(result.loading).toBe(true);
    expect(result.error).toBe(null);
  });

  test('Тестируем обработку.fulfilled при успешном получении еды', () => {
    const feedsResponse = {
      orders: [
        { id: 1, name: 'Order 1' },
        { id: 2, name: 'Order 2' }
      ],
      total: 2,
      totalToday: 1
    };
    const action = {
      type: getFeeds.fulfilled.type,
      payload: feedsResponse
    };
    const result = feedReducer(initialState, action); 
    expect(result.orders).toEqual(feedsResponse.orders); 
    expect(result.total).toBe(feedsResponse.total); 
    expect(result.totalToday).toBe(feedsResponse.totalToday); 
    expect(result.loading).toBe(false); 
    expect(result.error).toBe(null); 
  });

  test('Тестируем обработку.rejected при ошибке получения еды', () => {
    const errorMessage = 'Ошибка загрузки данных';
    const action = {
      type: getFeeds.rejected.type,
      error: { message: errorMessage }
    };
    const result = feedReducer(initialState, action); 
    expect(result.loading).toBe(false); 
    expect(result.error).toBe(errorMessage); 
  });
});