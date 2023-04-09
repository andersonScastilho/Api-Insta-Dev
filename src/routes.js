const { Router } = require('express');

const routes = new Router();
routes.get('/health', (req, res) => res.send({ message: 'Get status: true' }));
module.exports = routes;
