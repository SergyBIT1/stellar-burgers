import authReducer, {
  loginUser,
  registerUser,
  logoutUser,
  updateUser,
  getUser,
  getOrdersAll
} from './userSlice';

describe('userSlice', () => {
  const initialState = {
    loading: false,
    error: null,
    registerData: null,
    user: null,
    userCheck: false,
    isAuthenticated: false,
    userOrders: []
  };

  test('возврат начального состояния при неизвестном действии', () => {
    const result = authReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  test('обработка состояния регистрации (pending)', () => {
    const action = { type: registerUser.pending.type };
    const result = authReducer(initialState, action);
    expect(result.loading).toBe(true);
    expect(result.error).toBeNull();
    expect(result.isAuthenticated).toBe(false);
  });

  test('успешная регистрация пользователя (fulfilled)', () => {
    const user = { id: 'user', email: 'jaquecusto@test.io' };
    const action = {
      type: registerUser.fulfilled.type,
      payload: { user: user }
    };
    const result = authReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      loading: false,
      error: null,
      user,
      isAuthenticated: true
    });
  });

  test('обработка неудачной регистрации (rejected)', () => {
    const action = {
      type: registerUser.rejected.type,
      error: { message: 'Ошибка' }
    };
    const result = authReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      loading: false,
      error: 'Ошибка',
      isAuthenticated: false
    });
  });

  test('обработка состояния входа пользователя (pending)', () => {
    const action = { type: loginUser.pending.type }; 
    const result = authReducer(initialState, action); 
    expect(result.loading).toBe(true); 
    expect(result.error).toBeNull(); 
    expect(result.isAuthenticated).toBe(false); 
  });

  test('успешный вход пользователя (fulfilled)', () => {
    const user = { id: 'user', email: 'jaquecusto@test.io' }; 
    const action = {
      type: loginUser.fulfilled.type, 
      payload: { user: user } 
    };
    const result = authReducer(initialState, action); 
    expect(result).toEqual({
      ...initialState,
      loading: false,
      error: null,
      user, 
      isAuthenticated: true 
    });
  });

  test('обработка неудачного входа (rejected)', () => {
    const action = {
      type: loginUser.rejected.type, 
      error: { message: 'Ошибка' } 
    };
    const result = authReducer(initialState, action); 
    expect(result).toEqual({
      ...initialState,
      loading: false,
      error: 'Ошибка', 
      isAuthenticated: false 
    });
  });

  test('обработка состояния выхода пользователя (pending)', () => {
    const action = { type: logoutUser.pending.type };
    const result = authReducer(initialState, action); 
    expect(result.loading).toBe(true); 
    expect(result.error).toBeNull(); 
  });

  test('успешный выход пользователя (fulfilled)', () => {
    const action = { type: logoutUser.fulfilled.type }; 
    const result = authReducer(
      {
        ...initialState,
        user: { email: 'jaquecusto@test.io', name: '' }, 
        isAuthenticated: true 
      },
      action
    );
    expect(result).toEqual({
      ...initialState,
      loading: false,
      user: null, 
      isAuthenticated: false
    });
  });

  test('обработка неудачного выхода (rejected)', () => {
    const action = {
      type: logoutUser.rejected.type, 
      error: { message: 'Ошибка' } 
    };
    const result = authReducer(initialState, action); 
    expect(result).toEqual({
      ...initialState,
      loading: false,
      error: 'Ошибка', 
      isAuthenticated: true 
    });
  });

  test('обработка состояния обновления пользователя (pending)', () => {
    const action = { type: updateUser.pending.type }; 
    const result = authReducer(initialState, action); 
    expect(result.loading).toBe(true); 
    expect(result.error).toBeNull(); 
  });

  test('успешное обновление данных пользователя (fulfilled)', () => {
    const user = { id: 'user', email: 'jaquecusto@test.io' }; 
    const action = {
      type: updateUser.fulfilled.type, 
      payload: { user: user } 
    };
    const result = authReducer(initialState, action); 
    expect(result).toEqual({
      ...initialState,
      loading: false,
      error: null,
      user 
    });
  });

  test('обработка неудачного обновления (rejected)', () => {
    const action = {
      type: updateUser.rejected.type, 
      error: { message: 'Ошибка' } 
    };
    const result = authReducer(initialState, action); 
    expect(result).toEqual({
      ...initialState,
      loading: false,
      error: 'Ошибка' 
    });
  });

  test('обработка состояния получения данных пользователя (pending)', () => {
    const action = { type: getUser.pending.type };
    const result = authReducer(initialState, action);
    expect(result.loading).toBe(true); 
    expect(result.error).toBeNull(); 
  });

  test('успешное получение данных пользователя (fulfilled)', () => {
    const user = { id: 'user', email: 'jaquecusto@test.io' }; 
    const action = {
      type: getUser.fulfilled.type, 
      payload: { user: user } 
    };
    const result = authReducer(initialState, action); 
    expect(result).toEqual({
      ...initialState,
      loading: false,
      error: null,
      user,
      isAuthenticated: true
    });
  });

  test('обработка неудачного получения данных (rejected)', () => {
    const action = {
      type: getUser.rejected.type, 
      error: { message: 'Ошибка' } 
    };
    const result = authReducer(initialState, action); 
    expect(result).toEqual({
      ...initialState,
      loading: false,
      error: 'Ошибка', 
      isAuthenticated: false 
    });
  });

  test('обработка состояния получения всех заказов пользователя (pending)', () => {
    const action = { type: getOrdersAll.pending.type }; 
    const result = authReducer(initialState, action); 
    expect(result.loading).toBe(true);
    expect(result.error).toBeNull(); 
  });

  test('успешное получение всех заказов пользователя (fulfilled)', () => {
    const orders = [{ id: 'order1' }, { id: 'order2' }]; 
    const action = {
      type: getOrdersAll.fulfilled.type, 
      payload: orders 
    };
    const result = authReducer(initialState, action); 
    expect(result).toEqual({
      ...initialState,
      loading: false,
      error: null,
      userOrders: orders 
    });
  });

  test('обработка неудачного получения заказов (rejected)', () => {
    const action = {
      type: getOrdersAll.rejected.type, 
      error: { message: 'Ошибка' } 
    };
    const result = authReducer(initialState, action); 
    expect(result).toEqual({
      ...initialState,
      loading: false,
      error: 'Ошибка' 
    });
  });
});
