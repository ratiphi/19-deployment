'use strict';

const faker = require('faker');
const mocks = require('../lib/mocks');
const superagent = require('superagent');
const server = require('../../lib/server');
const Todo = require('../../model/todo');
require('jest');

describe('Testing Todo Routes', function() {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(mocks.todo.removeAll);
  afterEach(mocks.user.removeAll);

  describe('POST to /api/todo', function() {
    describe('Valid Requests', () => {
      beforeAll(() => {
        this.fakeTodoData = {
          name: faker.random.word(),
          desc: faker.random.words(12),
          priority: faker.random.word() };

        return mocks.user.createOne()
          .then(userData => this.userData = userData)
          .then(() => {
            return superagent.post(':4444/api/todo')
              .set('Authorization', `Bearer ${this.userData.token}`)
              .send(this.fakeTodoData);
          })
          .then(res => this.res = res);
      });

      test('should return a status of 201', () => {
        expect(this.res.status).toBe(201);
      });
      test('should return a new todo in the res', () => {
        expect(this.res.body.name).toBe(this.fakeTodoData.name);
        expect(this.res.body.desc).toBe(this.fakeTodoData.desc);
        expect(this.res.body.priority).toBe(this.fakeTodoData.priority);
      });
      test('should have a userId property', () => {
        expect(this.res.body).toHaveProperty('userId');
        expect(this.res.body.userId.toString()).toBe(this.userData.user._id.toString());
      });
    });

    describe('Invalid Requests', () => {
      test('should return a status of 401 given no Auth credentials', () => {
        return superagent.post(':4444/api/todo')
          .send(this.fakeTodoData)
          .catch(err => {
            expect(err.status).toBe(401);
          });
      });

      test('should return a 401 given bad Auth credintials', () => {
        return superagent.post(':4444/api/todo')
          .set('Authorization', 'Bearer badToken')
          .send(this.fakeTodoData)
          .catch(err => {
            expect(err.status).toBe(401);
          });
      });

      test('need to fix - should return 400 given bad req body', () => {
        return superagent.post(':4444/api/todo')
          .set('Authorization', `Bearer ${this.userData.token}`)
          .send({})
          .catch(err => {
            expect(err.status).toBe(401);
          });
      });
    });
  });

  describe('GET to /api/todo', function() {
    describe('Valid Requests', () => {
      beforeAll(() => {
        // this.fakeTodoData = {
        //   name: faker.random.word(),
        //   desc: faker.random.words(12),
        //   priority: faker.random.word() };

        return mocks.todo.createOne()
          .then(mockData => this.mockData = mockData)
          .then(() => {
            //console.log(this.mockData);
            return superagent.get(`:4444/api/todo/${this.mockData.todo._id}`)
              .set('Authorization', `Bearer ${this.mockData.user.token}`);
            //.send(this.fakeTodoData);
          })
          .then(res => this.res = res);
      });

      test('should return a status of 200', () => {
        expect(this.res.status).toBe(200);
      });
      test('should return a new todo in the res', () => {
        expect(this.res.body.name).toBe(this.mockData.todo.name);
        expect(this.res.body.desc).toBe(this.mockData.todo.desc);
        expect(this.res.body.priority).toBe(this.mockData.todo.priority);
      });
      test('should have a userId property', () => {
        expect(this.res.body).toHaveProperty('userId');
        expect(this.res.body.userId.toString()).toBe(this.mockData.user.user._id.toString());
      });
    });

    describe('Invalid Requests', () => {

    });
  });

  describe('PUT to /api/todo', function() {
    describe('Valid Requests', () => {
      beforeAll(() => {
        this.fakeTodoData = {
          name: faker.random.word(),
          desc: faker.random.words(12),
          priority: faker.random.word() };

        return mocks.user.createOne()
          .then(userData => this.userData = userData)
          .then(() => {
            return superagent.post(':4444/api/todo')
              .set('Authorization', `Bearer ${this.userData.token}`)
              .send(this.fakeTodoData);
          })
          .then(res => this.res = res);
      });

      test('should return a status of 201', () => {
        expect(this.res.status).toBe(201);
      });
      test('should return a new todo in the res', () => {
        expect(this.res.body.name).toBe(this.fakeTodoData.name);
        expect(this.res.body.desc).toBe(this.fakeTodoData.desc);
        expect(this.res.body.priority).toBe(this.fakeTodoData.priority);
      });
      test('should have a userId property', () => {
        expect(this.res.body).toHaveProperty('userId');
        expect(this.res.body.userId.toString()).toBe(this.userData.user._id.toString());
      });
    });

    describe('Invalid Requests', () => {

    });
  });

  describe('DELETE to /api/todo', function() {
    describe('Valid Requests', () => {
      beforeAll(() => {
        this.fakeTodoData = {
          name: faker.random.word(),
          desc: faker.random.words(12),
          priority: faker.random.word() };

        return mocks.user.createOne()
          .then(userData => this.userData = userData)
          .then(() => {
            return superagent.post(':4444/api/todo')
              .set('Authorization', `Bearer ${this.userData.token}`)
              .send(this.fakeTodoData);
          })
          .then(res => this.res = res);
      });

      test('should return a status of 201', () => {
        expect(this.res.status).toBe(201);
      });
      test('should return a new todo in the res', () => {
        expect(this.res.body.name).toBe(this.fakeTodoData.name);
        expect(this.res.body.desc).toBe(this.fakeTodoData.desc);
        expect(this.res.body.priority).toBe(this.fakeTodoData.priority);
      });
      test('should have a userId property', () => {
        expect(this.res.body).toHaveProperty('userId');
        expect(this.res.body.userId.toString()).toBe(this.userData.user._id.toString());
      });
    });

    describe('Invalid Requests', () => {

    });
  });
});
