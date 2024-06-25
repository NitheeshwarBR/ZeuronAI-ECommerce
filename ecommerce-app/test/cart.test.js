const request = require('supertest');
const app = require('../app');
const agent = request.agent(app); 

describe('Cart Management API', () => {

  beforeAll(async () => {
  
    await agent
      .post('/auth/login')
      .send({
        username: 'testuser2',   
        password: 'newpassword123456' 
      })
      .expect(200);
  });

  test('It should add a product to the cart and return the cart item ID', async () => {
    const cartItem = {
      userId: 7,  
      productId: 9, 
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
    const cartItemId = 1; 

    const response = await agent
      .delete(`/cart/${cartItemId}`)
      .expect(200);

    expect(response.body.message).toEqual('Product removed from cart successfully');
  });
});
