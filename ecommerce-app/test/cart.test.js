// tests/cart.test.js
const request = require('supertest');
const app = require('../app');
const agent = request.agent(app);  // Using agent to maintain session state

describe('Cart Management API', () => {

  beforeAll(async () => {
    // Log in to authenticate and store session cookies
    await agent
      .post('/auth/login')
      .send({
        username: 'testuser2',   // Ensure this user exists in your test database
        password: 'newpassword123' // Correct password for the user
      })
      .expect(200);
  });

  test('It should add a product to the cart and return the cart item ID', async () => {
    const cartItem = {
      userId: 7,  // Assume this is the logged-in user's ID
      productId: 9,  // Assume this product ID exists
      quantity: 2
    };

    const response = await agent
      .post('/cart')
      .send(cartItem)
      .expect(201);

    expect(response.body).toHaveProperty('cartItemId');
    expect(response.body.message).toEqual('Product added to cart successfully');
  });

  test('It should retrieve all cart items for the user', async () => {
    const response = await agent
      .get('/cart')
      .expect(200);

    expect(response.body).toHaveProperty('cartItems');
    expect(Array.isArray(response.body.cartItems)).toBe(true);
    expect(response.body.message).toEqual('Cart items fetched successfully');
  });

  test('It should remove a product from the cart', async () => {
    const cartItemId = 1;  // Assume this cart item ID exists in the user's cart

    const response = await agent
      .delete(`/cart/${cartItemId}`)
      .expect(200);

    expect(response.body.message).toEqual('Product removed from cart successfully');
  });
});
