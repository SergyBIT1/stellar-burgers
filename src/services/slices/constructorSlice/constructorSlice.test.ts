import { TOrder } from '@utils-types';
import constructorSlice, {
  addIngredient,
  moveIngredientDown,
  moveIngredientUp,
  orderBurger,
  removeIngredient,
  setRequest,
  resetModal
} from './constructorSlice';
import { expect, test, describe } from '@jest/globals';

// набор тестов для slice конструктора
describe('constructorSlice', () => {

  const initialState = {
    constructorItems: {
      bun: null,
      ingredients: []
    },
    loading: false,
    orderRequest: false,
    orderModalData: {
      _id: '',
      status: '',
      name: '',
      createdAt: '',
      updatedAt: '',
      number: 1,
      ingredients: []
    } as TOrder,
    error: null
  };

  describe('добавление ингредиентов', () => {
    test('добавление нового ингредиента', () => {
      const toAddIngredient = {
        _id: "643d69a5c3f7b9001cfa0945",
        name: "Соус с шипами Антарианского плоскоходца",
        type: "sauce",
        proteins: 101,
        fat: 99,
        carbohydrates: 100,
        calories: 100,
        price: 88,
        image: "https://code.s3.yandex.net/react/code/sauce-01.png",
        image_mobile: "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/sauce-01-large.png",
      };

      // Добавление ингредиента в состояние
      const result = constructorSlice(
        initialState,
        addIngredient(toAddIngredient)
      );

      // Проверка, что новый ингредиент добавлен в массив ingredients
      expect(result.constructorItems.ingredients).toContainEqual({
        ...toAddIngredient,
        id: expect.any(String)
      });
    });

    test('добавление булочки', () => {
      const toAddBun = {
        _id: "643d69a5c3f7b9001cfa093d",
        name: "Флюоресцентная булка R2-D3",
        type: "bun",
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: "https://code.s3.yandex.net/react/code/bun-01.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
      };

      // Добавление булочки в состояние
      const result = constructorSlice(initialState, addIngredient(toAddBun));

      // Проверка, что булочка добавлена в состояние
      expect(result.constructorItems.bun).toEqual({
        ...toAddBun,
        id: expect.any(String)
      });
    });

    test('замена добавленной булочки', () => {
      const initialStateWithBun = {
        ...initialState,
        constructorItems: {
          bun: {
            _id: '643d69a5c3f7b9001cfa093c',
            name: 'Краторная булка N-200i',
            type: 'bun',
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: 'https://code.s3.yandex.net/react/code/bun-02.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/bun-02-large.png',
            id: 'Bun'
          },
          ingredients: []
        }
      };

      // Новая булочка для замены
      const actualBun = {
        _id: '643d69a5c3f7b9001cfa093d',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
      };

      // Добавление новой булочки и ожидание замены
      const result = constructorSlice(
        initialStateWithBun,
        addIngredient(actualBun)
      );

      // Проверка, что булочка была заменена
      expect(result.constructorItems.bun).toEqual({
        ...actualBun,
        id: expect.any(String) // Проверка, что id сгенерирован и является строкой
      });
    });
  });

  describe('удаление ингредиентов', () => {
    const stateWithIngredient = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: [
          {
            id: 'sauce5',
            _id: '643d69a5c3f7b9001cfa0944',
            name: 'Соус традиционный галактический',
            type: 'sauce',
            proteins: 42,
            fat: 24,
            carbohydrates: 42,
            calories: 99,
            price: 15,
            image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/sauce-03-large.png'
          }
        ]
      }
    };

    test('удаление добавленного ингредиента', () => {
      const result = constructorSlice(
        stateWithIngredient,
        removeIngredient('sauce5')
      );

      // Проверка, что массив ингредиентов теперь пуст
      expect(result.constructorItems.ingredients).toEqual([]);
    });
  });

  describe('перемещение ингредиентов', () => {
    const stateWithIngredients = {
      ...initialState,
      constructorItems: {
        bun: {
          id: 'bun1',
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
        },
        ingredients: [
          {
            id: 'sauce5',
            _id: "643d69a5c3f7b9001cfa0942",
            name: "Соус Spicy-X",
            type: "sauce",
            proteins: 30,
            fat: 20,
            carbohydrates: 40,
            calories: 30,
            price: 90,
            image: "https://code.s3.yandex.net/react/code/sauce-02.png",
            image_mobile: 
              "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
            image_large: 
              "https://code.s3.yandex.net/react/code/sauce-02-large.png",
          },
          {
            id: 'main11',
            _id: '643d69a5c3f7b9001cfa0946',
            name: 'Хрустящие минеральные кольца',
            type: 'main',
            proteins: 808,
            fat: 689,
            carbohydrates: 609,
            calories: 986,
            price: 300,
            image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/mineral_rings-large.png'
          },
          {
            id: 'main12',
            _id: "643d69a5c3f7b9001cfa0948",
            name: "Кристаллы марсианских альфа-сахаридов",
            type: "main",
            proteins: 234,
            fat: 432,
            carbohydrates: 111,
            calories: 189,
            price: 762,
            image: 
              "https://code.s3.yandex.net/react/code/core.png",
            image_mobile:
               "https://code.s3.yandex.net/react/code/core-mobile.png",
            image_large:
               "https://code.s3.yandex.net/react/code/core-large.png",
          }
        ]
      }
    };

    test('перемещение ингредиента вверх', () => {
      const result = constructorSlice(
        stateWithIngredients,
        moveIngredientUp(2) // Перемещение ингредиента с индексом 2 вверх
      );

      // Ожидаемый порядок ингредиентов после перемещения
      const expectedIngredientSequence = [
        stateWithIngredients.constructorItems.ingredients[0],
        stateWithIngredients.constructorItems.ingredients[2],
        stateWithIngredients.constructorItems.ingredients[1]
      ];

      expect(result.constructorItems.ingredients).toEqual(
        expectedIngredientSequence
      );
    });

    test('перемещение ингредиента вниз', () => {
      const result = constructorSlice(
        stateWithIngredients,
        moveIngredientDown(1)
      );

      // Ожидаемый порядок ингредиентов после перемещения
      const expectedIngredientSequence = [
        stateWithIngredients.constructorItems.ingredients[0],
        stateWithIngredients.constructorItems.ingredients[2],
        stateWithIngredients.constructorItems.ingredients[1]
      ];

      expect(result.constructorItems.ingredients).toEqual(
        expectedIngredientSequence
      );
    });
  });

  // Тесты для заказа бургера
  describe('orderBurger', () => {
    const actions = {
      pending: { type: orderBurger.pending.type, payload: null }, 
      rejected: {
        type: orderBurger.rejected.type,
        error: { message: 'error' } 
      },
      fulfilled: {
        type: orderBurger.fulfilled.type,
        payload: { order: { number: 404 } } 
      }
    };

    test('состояние ожидания', () => {
      const result = constructorSlice(initialState, actions.pending);
      expect(result.loading).toBe(true); 
      expect(result.error).toBeNull(); 
    });

    test('состояние отказа', () => {
      const result = constructorSlice(initialState, actions.rejected);
      expect(result.loading).toBe(false); 
      expect(result.error).toBe('error'); 
    });

    test('состояние успешного выполнения', () => {
      const result = constructorSlice(initialState, actions.fulfilled);
      expect(result.loading).toBe(false); 
      expect(result.orderModalData?.number).toBe(404); 
      expect(result.error).toBeNull(); 
    });
  });

  // Тесты для setRequest
  describe('setRequest', () => {
    test('sets order request state', () => {
      const orderData = true;
      const result = constructorSlice(initialState, setRequest(orderData)); 
      expect(result.orderRequest).toBe(orderData); 
    });
  });

  // Тесты для resetModal
  describe('resetModal', () => {
    test('обнуление данных', () => {
      const stateWithModalData = {
        ...initialState,
        orderModalData: {
          _id: '',
          status: '',
          name: '',
          createdAt: '',
          updatedAt: '',
          number: 1,
          ingredients: []
        }
      };
      const result = constructorSlice(stateWithModalData, resetModal()); 
      expect(result.orderModalData).toBeNull(); 
    });
  });
});
