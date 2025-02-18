import Cypress from "cypress";

const baseUrl = 'http://localhost:4000';

const addButtonBun =
  '[data-cy=ingredient-item-643d69a5c3f7b9001cfa093d] button[type=button]';
const addButtonIngredient =
  '[data-cy=ingredient-item-643d69a5c3f7b9001cfa0943] button[type=button]';

describe ('Создание заказа'  , () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {fixture: 'ingredient.json'}).as('getIngredients')
    cy.intercept('GET', 'api/auth/user', {fixture: 'user.json'}).as('getUser')
    cy.intercept('POST', 'api/orders', {fixture: 'order.json'}).as('postOrder')

  // window.localStorage.setItem('refreshToken', 'mockRefreshToken')
  // cy.setCookie('accessToken', 'mockAccessToken')

  cy.visit(baseUrl)
  })

  // afterEach(() => {
  //   cy.clearCookie('refreshToken')
  //   cy.clearCookie('accessToken')
  // })

 describe('Конструктор и создание заказа', () => {
  it('добавление булочки и ингредиента в конструктор', () => {
    cy.wait('@getIngredients')

    cy.get('[data-cy=bun-top]').should('not.exist');
    cy.get('[data-cy=bun-bottom]').should('not.exist');

    

    // Добавление булки
    cy.get(addButtonBun).click();
    // Проверка верхней булки
    cy.get('[data-cy=bun-top]')
       .contains('Флюоресцентная булка R2-D3')
      .should('exist');
    // Проверка нижней булки
    cy.get('[data-cy=bun-bottom]')
      .contains('Флюоресцентная булка R2-D3')
      .should('exist');

    // Проверяем, что основной ингредиент отсутствует в конструкторе
    cy.get('[data-cy=between-buns]').should('not.exist'); // Ожидаем, что соус отсутствует

    // Добавление основного ингредиента
    cy.get(addButtonIngredient).click();
    // Проверка добавленного ингредиента
    cy.get('[data-cy=between-buns]')
      .contains('Соус фирменный Space Sauce')
      .should('exist');
  })
 })
    

  })


