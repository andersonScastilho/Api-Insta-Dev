const { Router } = require("express");
const { updload } = require("./configs/multer");

const SchemaValidator = require("./apps/middlewares/SchemaValidator");
const AuthenticationMiddleware = require("./apps/middlewares/Authentication");

const UserSchema = require("./schema/Create.User.Schema.json");
const AuthSchema = require("./schema/Auth.Schema.json");
const PostSchema = require("./schema/Post.Schema.json");

const AuthenticationController = require("./apps/controllers/AuthenticationController");
const UserController = require("./apps/controllers/UserController");
const FileController = require("./apps/controllers/FileController");
const PostController = require("./apps/controllers/PostController");

const routes = new Router();

routes.post("/users", SchemaValidator(UserSchema), UserController.store);

routes.post(
  "/auth",
  SchemaValidator(AuthSchema),
  AuthenticationController.store
);

routes.use(AuthenticationMiddleware);

routes.put("/users", UserController.update);
routes.delete("/users", UserController.delete);
routes.get("/user-profile", UserController.index);

routes.post("/upload", updload.single("image"), FileController.upload);

routes.post("/new-post", SchemaValidator(PostSchema), PostController.store);
routes.delete("/delete-post/:id", PostController.delete);

module.exports = routes;
