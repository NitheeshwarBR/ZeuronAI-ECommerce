const request = require('supertest');
const app = require('../app');  

describe('POST /auth/signup', () => {
  test('It should respond with the newly created user', async () => {
    const newUser = {
      username: 'testuser6',
      password: 'password123'
    };

    const response = await request(app)
      .post('/auth/signup')
      .send(newUser);

    expect(response.statusCode).toBe(201);
    expect(response.body.username).toEqual(newUser.username);
    expect(response.body).toHaveProperty('id');
  });
});
