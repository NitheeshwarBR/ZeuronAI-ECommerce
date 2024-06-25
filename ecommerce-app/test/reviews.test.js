// tests/review.test.js
const request = require('supertest');
const app = require('../app');
const agent = request.agent(app);  // Using agent to maintain session state

describe('Review Management API', () => {

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

  test('It should add a review for a product and return the review ID', async () => {
    const newReview = {
      userId: 7,  // This would typically be fetched from session in a real app
      productId: 9,  // Assume this product exists
      rating: 5,
      comment: 'Excellent product!'
    };

    const response = await agent
      .post('/reviews')
      .send(newReview)
      .expect(201);

    expect(response.body).toHaveProperty('reviewId');
    expect(response.body.message).toEqual('Review added successfully');
  });

  test('It should retrieve all reviews for a product', async () => {
    const productId = 9;  // Assuming this product ID has reviews
    const response = await agent
      .get(`/reviews/${productId}`)
      .expect(200);

    expect(response.body).toHaveProperty('reviews');
    expect(Array.isArray(response.body.reviews)).toBe(true);
    expect(response.body.message).toEqual('Retrieved reviews successfully');
  });

  test('It should handle errors when adding a review fails', async () => {
    const newReview = {
      userId: 7, 
      productId: 9999,  // Assuming this product does not exist
      rating: 5,
      comment: 'This should fail!'
    };

    const response = await agent
      .post('/reviews')
      .send(newReview)
      .expect(500);

    expect(response.body.error).toEqual('Error adding review');
  });

  test('It should handle errors when fetching reviews fails', async () => {
    const productId = 9999;  // Assuming no reviews for this product ID
    const response = await agent
      .get(`/reviews/${productId}`)
      .expect(500);

    expect(response.body.error).toEqual('Error fetching reviews');
  });
});
