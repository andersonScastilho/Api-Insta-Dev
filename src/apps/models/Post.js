const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Post extends Model {
  static init(sequelize) {
    super.init({
      image: Sequelize.STRING,
      description: Sequelize.STRING,
      number_likes: Sequelize.INTEGER,
      author_id: Sequelize.INTEGER,
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'author_id', as: 'user' });
  }
}
module.exports = Post;
