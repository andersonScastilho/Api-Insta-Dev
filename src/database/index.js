const Sequelize = require('sequelize');

const databaseconfig = require('../configs/db');

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseconfig);
  }
}

module.exports = new Database();
