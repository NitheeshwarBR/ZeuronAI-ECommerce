import { should, use } from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../index.js'; // Adjust the path if necessary

should();
use(chaiHttp);

describe('Authentication', () => {
  let token;

  // Test signup
  describe('/POST signup', () => {
    it('it should SIGNUP a new user', (done) => {
      chai.request(app)
        .post('/signup')
        .send({
          username: 'example_user',
          password: 'password123'
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('token');
          done();
        });
    });
  });

  // Test login
  describe('/POST login', () => {
    it('it should LOGIN a user', (done) => {
      chai.request(app)
        .post('/login')
        .send({
          username: 'example_user',
          password: 'password123'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('token');
          token = res.body.token; // Save token for later tests
          done();
        });
    });
  });

  // Test update username
  describe('/PUT update-username', () => {
    it('it should UPDATE the username', (done) => {
      chai.request(app)
        .put('/update-username')
        .set('Authorization', `Bearer ${token}`)
        .send({
          newUsername: 'new_example_user'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Username updated successfully');
          done();
        });
    });
  });

  // Test update password
  describe('/PUT update-password', () => {
    it('it should UPDATE the password', (done) => {
      chai.request(app)
        .put('/update-password')
        .set('Authorization', `Bearer ${token}`)
        .send({
          newPassword: 'new_password123'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Password updated successfully');
          done();
        });
    });
  });

  // Test logout
  describe('/POST logout', () => {
    it('it should LOGOUT the user', (done) => {
      chai.request(app)
        .post('/logout')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('User logged out successfully');
          done();
        });
    });
  });
});
