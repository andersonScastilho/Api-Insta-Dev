const { Router } = require('express');
const SchemaValidator = require('./apps/middlewares/SchemaValidator');

const UserController = require('./apps/controllers/UserController');
const UserSchema = require('./schema/Create.User.Schema.json');

const routes = new Router();

routes.post('/users', SchemaValidator(UserSchema), UserController.store);

routes.get('/health', (req, res) => res.send({ message: 'Get status: true' }));

module.exports = routes;
