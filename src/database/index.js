const Sequelize = require('sequelize');
const User = require('../apps/models/User');
const databaseconfig = require('../configs/db');

const models = [User];
class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseconfig);

    models.map((model) => model.init(this.connection));
  }
}

module.exports = new Database();
