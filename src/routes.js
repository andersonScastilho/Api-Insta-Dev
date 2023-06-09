const { Router } = require('express');
const { updload } = require('./configs/multer');

const SchemaValidator = require('./apps/middlewares/SchemaValidator');
const AuthenticationMiddleware = require('./apps/middlewares/Authentication');

const UserSchema = require('./schema/Create.User.Schema.json');
const AuthSchema = require('./schema/Auth.Schema.json');
const PostSchema = require('./schema/Post.Schema.json');

const AuthenticationController = require('./apps/controllers/AuthenticationController');
const UserController = require('./apps/controllers/UserController');
const FileController = require('./apps/controllers/FileController');
const PostController = require('./apps/controllers/PostController');
const LikeController = require('./apps/controllers/LikeController');

const routes = new Router();

// User - Create
routes.post('/user', SchemaValidator(UserSchema), UserController.store);

// Token - Login
routes.post(
  '/auth',
  SchemaValidator(AuthSchema),
  AuthenticationController.store,
);

routes.use(AuthenticationMiddleware);

// User
routes.put('/user', UserController.update);
routes.delete('/user', UserController.delete);
routes.get('/user', UserController.index);

// Updload
routes.post('/upload', updload.single('image'), FileController.upload);

// Posts
routes.post('/posts', SchemaValidator(PostSchema), PostController.store);
routes.delete('/posts/:id', PostController.delete);
routes.put('/posts/:id', PostController.update);
routes.get('/posts/my-posts', PostController.show);
routes.get('/posts', PostController.listAllPost);

// Likes
routes.put('/likes/:id', LikeController.store);

module.exports = routes;
