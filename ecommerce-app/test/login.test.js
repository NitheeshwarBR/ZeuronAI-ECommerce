
const request = require('supertest');
const app = require('../app');
const agent = request.agent(app);  

describe('POST /auth/login', () => {
  test('It should log in an existing user and return a token', async () => {
    const credentials = {
      username: 'testuser2',
      password: 'newpassword12345'
    };

    const response = await agent
      .post('/auth/login')
      .send(credentials);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Login successful');
    expect(response.body).toHaveProperty('id');
    expect(response.headers['set-cookie']).toBeDefined(); 
  });
  test('It should reject login with incorrect password', async () => {
    const credentials = {
      username: 'existinguser',
      password: 'wrongpassword'
    };

    const response = await request(app)
      .post('/auth/login')
      .send(credentials);

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('error', 'User not found');
  });
});
