'use strict';

const User = require('../../model/user');
const Todo = require('../../model/todo');
const faker = require('faker');

const mocks = module.exports = {};
mocks.user = {};
mocks.todo = {};

mocks.user.createOne = function() {
  let result = {};
  result.password = faker.internet.password();

  let user = new User({
    username: faker.internet.userName(),
    email: faker.internet.email()
  });

  return user.generatePasswordHash(result.password)
    .then(user => {
      result.user = user;
      return user.save();
    })
    .then(user => user.generateToken())
    .then(token => {
      result.token = token;
      return result;
    });
};

mocks.todo.createOne = function() {
  let result = {};

  return mocks.user.createOne()
    .then(userData => result.user = userData)
    .then(userData => {
      return new Todo({
        name: faker.random.word(),
        desc: faker.random.words(12),
        priority: faker.random.word(),
        userId: userData.user._id
      }).save();
    })
    .then(todo => {
      result.todo = todo;
      return result;
    });
};

mocks.todo.removeAll = function() {
  return Promise.all([
    Todo.remove()
  ]);
};

mocks.user.removeAll = function() {
  return Promise.all([
    User.remove()
  ]);
};
