const { Router } = require('express');
const UserController = require('./apps/controllers/UserController');

const routes = new Router();

routes.post('/users', UserController.store);

routes.get('/health', (req, res) => res.send({ message: 'Get status: true' }));

module.exports = routes;
