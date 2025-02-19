import { getOrderByNumber, orderSlice, initialState } from './orderSlice';

describe('orderSlice', () => {
  const { reducer } = orderSlice;

  test('Проверка начального состояния редюсера', () => {
    const result = reducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  test('Тестирование состояния при ожидании запроса', () => {
    const action = { type: getOrderByNumber.pending.type };
    const result = reducer(initialState, action);
    expect(result.request).toBe(true);
    expect(result.error).toBe(null);
  });

  test('Тестирование состояния при успешном выполнении', () => {
    const ordersResponse = {
      orders: [
        {
          _id: '1',
          status: 'done',
          name: 'Order 1',
          createdAt: '',
          updatedAt: '',
          number: 1,
          ingredients: ['ingr1', 'ingr2']
        }
      ]
    };
    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: ordersResponse
    };

    // Проверка редюсера на получение успешного ответа
    const result = reducer(initialState, action);
    expect(result.request).toBe(false);
    expect(result.error).toBe(null);
    expect(result.orderByNumberResponse).toEqual(ordersResponse.orders[0]);
    expect(result.orders).toContain(ordersResponse.orders[0]);
  });

  test('Тестирование состояния при ошибке', () => {
    const errorMessage = 'Error fetching order';
    const action = {
      type: getOrderByNumber.rejected.type,
      error: { message: errorMessage }
    };
    const result = reducer(initialState, action);
    expect(result.request).toBe(false);
    expect(result.error).toBe(errorMessage);
  });
});