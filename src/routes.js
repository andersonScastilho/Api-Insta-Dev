const { Router } = require('express');
const UserModel = require('./apps/models/User');

const routes = new Router();

routes.get('/', async (req, res) => {
  const allUsers = await UserModel.findAll();
  res.send({ users: allUsers });
});

routes.get('/health', (req, res) => res.send({ message: 'Get status: true' }));

module.exports = routes;
