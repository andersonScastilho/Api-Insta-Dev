const { Router } = require('express');
const SchemaValidator = require('./apps/middlewares/SchemaValidator');

const UserController = require('./apps/controllers/UserController');
const UserSchema = require('./schema/Create.User.Schema.json');
const AuthSchema = require('./schema/Auth.Schema.json');
const AuthenticationController = require('./apps/controllers/AuthenticationController');

const routes = new Router();

routes.post('/users', SchemaValidator(UserSchema), UserController.store);
routes.post('/auth', SchemaValidator(AuthSchema), AuthenticationController.store);

module.exports = routes;
