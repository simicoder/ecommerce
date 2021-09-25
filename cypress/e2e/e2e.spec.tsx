describe('full app working', () => {
  it('should works :)', () => {
    const email = 'email@gmail.com';
    const password = 'ZAQ!2wsx';
    cy.visit('/')
      // redirect to login page by default
      .url()
      .should('include', '/login')
      //create a new user
      .visit('/register')
      .get('#email')
      .type(email)
      .get('#password')
      .type(password)
      .get('[data-testid=submit]')
      .click()
      //login with new user
      .visit('/login')
      .get('#email')
      .type(email)
      .get('#password')
      .type(password)
      .get('[data-testid=submit]')
      .click()
      .wait(1500)
      //after login user should be redirected to home page
      .url()
      .should('eq', 'http://localhost:3000/')
      //add products to cart
      .get('main a')
      .first()
      .click()
      .wait(5000)
      .get('[data-testid=add-to-cart-btn]')
      .click()
      .go('back')
      .get('main a')
      .last()
      .click()
      .wait(5000)
      .get('[data-testid=add-to-cart-btn]')
      .click()
      //added products should be in the cart
      .get('[data-testid=cart-btn]')
      .click()
      .get('[data-testid=cart-list]')
      .find('li')
      .should('have.length', 2)
      //remove one from the cart
      .get('li')
      .last()
      .find('button')
      .click()
      .get('[data-testid=cart-list]')
      .find('li')
      .should('have.length', 1)
      //go checkout!
      .get('button')
      .contains(/checkout/i)
      .click()
      .wait(1000)
      .url()
      .should('include', '/checkout')
      .get('[data-testid=checkout-list]')
      .find('li')
      .should('have.length', 1)
      .get('[data-testid=pay-now-btn]')
      .should('not.be.disabled');
  });
});
