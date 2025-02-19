import ingredientSlice, {
  getIngredients,
  initialState
} from './ingredientSlice';

describe('ingredientSlice', () => {

  // Блок тестов для обработки действий, связанных с получением ингредиентов
  describe('getIngredients', () => {

    // Определение различных состояний действий для получения ингредиентов
    const actions = {
      pending: {
        type: getIngredients.pending.type,
        payload: null 
      },
      rejected: {
        type: getIngredients.rejected.type, 
        error: { message: 'error' } 
      },
      fulfilled: {
        type: getIngredients.fulfilled.type, 
        payload: ['ingredient1', 'ingredient2'] 
      }
    };

    test('Тест на установку состояния загрузки в true, когда получение ингредиентов в процессе', () => {
      const result = ingredientSlice(initialState, actions.pending); 
      expect(result.loading).toBe(true); 
      expect(result.error).toBeNull(); 
    });

    test('Тест на обработку состояния ошибки, когда получение ингредиентов завершилось неудачей', () => {
      const result = ingredientSlice(initialState, actions.rejected); 
      expect(result.loading).toBe(false); 
      expect(result.error).toBe(actions.rejected.error.message); 
      expect(result.ingredients).toEqual([]); 
    });

    test('Тест на обновление состояния при успешном получении ингредиентов', () => {
      const result = ingredientSlice(initialState, actions.fulfilled); 
      expect(result.loading).toBe(false); 
      expect(result.ingredients).toEqual(actions.fulfilled.payload); 
      expect(result.error).toBeNull(); 
    });
  });
});