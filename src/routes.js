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
routes.post('/users', SchemaValidator(UserSchema), UserController.store);

// Token - Login
routes.post(
  '/auth',
  SchemaValidator(AuthSchema),
  AuthenticationController.store,
);

routes.use(AuthenticationMiddleware);

// User
routes.put('/users', UserController.update);
routes.delete('/users', UserController.delete);
routes.get('/user-profile', UserController.index);

// Updload
routes.post('/upload', updload.single('image'), FileController.upload);

// Posts
routes.post('/post', SchemaValidator(PostSchema), PostController.store);
routes.delete('/post/:id', PostController.delete);
routes.put('/post/:id', PostController.update);
routes.get('/my-posts', PostController.show);
routes.get('/post', PostController.listAllPost);

// Likes
routes.put('/like/:id', LikeController.store);

module.exports = routes;
