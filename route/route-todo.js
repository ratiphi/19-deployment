'use strict';

const Todo = require('../model/todo');
const errorHandler = require('../lib/error-handler');
const debug = require('debug')('cfgram:route-todo');
const bearerAuth = require('../lib/bearer-auth-middleware');

module.exports = function(router) {
  router.post('/api/todo', bearerAuth, (req, res) => {
    debug('POST /api/todo');

    // http POST (auth token) :5000/api/todo name='my fancy todo' desc='it be dabomb'

    req.body.userId = req.user._id;

    return new Todo(req.body).save()
      .then(todo => res.status(201).json(todo))
      .catch(err => {
        // console.log(err);
        errorHandler(err, req, res);
      });
  });

  router.get('/api/todo/:_id', bearerAuth, (req, res) => {
    debug('GET /api/todo/:_id');

    return Todo.findById(req.params._id)
      .then(todo => res.json(todo))
      .catch(err => errorHandler(err, req, res));
  });

  router.get('/api/todo/', bearerAuth, (req, res) => {
    debug('GET /api/todo/');

    return Todo.find()
      .then(todo => res.json(todo.map(todo => todo._id)))
      .catch(err => errorHandler(err, req, res));
  });

  router.put('/api/todo/:_id', bearerAuth, (req, res) => {
    debug('PUT /api/todo/:_id');

    return Todo.findByIdAndUpdate(req.params._id, req.body, { upsert:true, runValidators:true })
      .then(() => res.sendStatus(204))
      .catch(err => errorHandler(err, req, res));
  });

  router.delete('/api/todo/:_id', bearerAuth, (req, res) => {
    debug('DELETE /api/todo/:_id');

    return Todo.findByIdAndRemove(req.params._id)
      .then(() => res.sendStatus(204))
      .catch(err => errorHandler(err, req, res));
  });
};
