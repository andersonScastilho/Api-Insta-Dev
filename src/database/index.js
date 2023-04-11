const Sequelize = require('sequelize');
const databaseconfig = require('../configs/db');

const User = require('../apps/models/User');
const Post = require('../apps/models/Post');

const models = [User, Post];
class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseconfig);
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models),
      );
  }
}

module.exports = new Database();
