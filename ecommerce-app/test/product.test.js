
const request = require('supertest');
const app = require('../app');
const agent = request.agent(app);

describe('Product Management API', () => {

  beforeAll(async () => {
    
    await agent
      .post('/auth/login')
      .send({
        username: 'testuser2',   
        password: 'newpassword123456'
      })
      .expect(200); 
  });

  test('It should add a product and return the product ID', async () => {
    const newProduct = {
      image: 'http://example.com/product.jpg',
      title: 'New Gadget',
      description: 'A revolutionary new gadget',
      price: 299.99,
      category: 'Electronics'
    };

    const response = await agent
      .post('/products')
      .send(newProduct)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.message).toEqual('Product added successfully');
  });

  test('It should retrieve all products', async () => {
    const response = await agent
      .get('/products')
      .expect(200);

    expect(response.body).toHaveProperty('products');
    expect(Array.isArray(response.body.products)).toBe(true);
    expect(response.body.message).toEqual('Products listed successfully');
  });

  test('It should return products based on the search query', async () => {
    const query = 'Gadget';
    const response = await agent
      .get(`/products/search?q=${query}`)
      .expect(200);

    expect(response.body).toHaveProperty('products');
    expect(Array.isArray(response.body.products)).toBe(true);
    expect(response.body.message).toEqual('Products searched successfully');
  });

  test('It should return a single product by ID', async () => {
    const productId = 9;  
    const response = await agent
      .get(`/products/${productId}`)
      .expect(200);

    expect(response.body).toHaveProperty('product');
    expect(response.body.product.id).toBe(productId);
    expect(response.body.message).toEqual('Product fetched successfully');
  });

  test('It should return 404 if the product does not exist', async () => {
    const productId = 9999; 
    const response = await agent
      .get(`/products/${productId}`)
      .expect(404);

    expect(response.body.error).toEqual('Product not found');
  });
});
