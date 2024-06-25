
const request = require('supertest');
const app = require('../app');
const agent = request.agent(app);

describe('PUT /auth/update-password', () => {

  beforeAll(async () => {
    await agent
      .post('/auth/login')
      .send({
        username: 'testuser2',   
        password: 'newpassword12345' 
      })
      .expect(200);
  });

  test('It should update the password successfully for authenticated user', async () => {
    const updateResponse = await agent
      .put('/auth/update-password')
      .send({
        newPassword: 'newpassword123456' 
      });

    expect(updateResponse.statusCode).toBe(200);
    expect(updateResponse.body).toHaveProperty('message', 'Password updated successfully');
  });

  test('It should not update password if not authenticated', async () => {
   
    const newAgent = request(app);
    const updateResponse = await newAgent
      .put('/auth/update-password')
      .send({
        newPassword: 'newpassword1234'  
      });

    expect(updateResponse.statusCode).toBe(401);  
  });
});
