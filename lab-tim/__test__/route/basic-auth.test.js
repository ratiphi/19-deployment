'use strict';

const faker = require('faker');
const mocks = require('../lib/mocks');
const superagent = require('superagent');
const server = require('../../lib/server');
const User = require('../../model/user');
require('jest');

describe('Testing basic auth routes', function() {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(mocks.user.removeAll);


  describe('POST to /api/signup', function() {
    describe('Valid Requests', () => {
      beforeAll(() => {
        this.mockUserData = {
          username: faker.internet.userName(),
          password: faker.internet.password(),
          email: faker.internet.email()
        };

        return superagent.post(':4444/api/signup')
          .send(this.mockUserData)
          .then(res => this.res = res)
          .catch(console.error);
      });

      test('should respond with a token', () => {
        // expect(this.res.text).toMatch('/[a-f0-9]{32}/')
        expect(this.res.text).toBeTruthy();
        expect(this.res.text.length > 1).toBeTruthy();
      });
      test('should return a status of 200', () => {
        expect(this.res.status).toBe(200);
      });
    });

    describe('Invalid Requests', () => {
      test('should return a 400 Bad Request given bad req body', () => {
        return superagent.post(':4444/api/signup')
          .send({ username: 'wat' })
          .catch(err => {
            expect(err.status).toBe(400);
          });
      });
      test('should return a 404 given bad route', () => {
        return superagent.post(':4444/api/bad/route')
          .send(this.mockUserData)
          .catch(err => {
            expect(err.status).toBe(404);
          });
      });
    });
  });

  describe('GET to /api/signin', function() {
    beforeAll(() => {
      return mocks.user.createOne()
        .then(userData => {
          this.tempUser = userData.user;

          return superagent.get(':4444/api/signin')
            .auth(userData.user.username, userData.password)
            .then(res => this.res = res);
        });
    });

    test('should return a token', () => {
      expect(this.res.text).toBeTruthy();
      expect(this.res.text.length > 1).toBeTruthy();
    });

    test('should return a status of 200', () => {
      expect(this.res.status).toBe(200);
    });
  });
});
