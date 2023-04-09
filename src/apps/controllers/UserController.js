const User = require('../models/User');

class UserController {
  async store(req, res) {
    const {
      name, user_name, email, avatar, bio, gender, password,
    } = req.body;

    const verifyEmail = await User.findOne({
      where: {
        email,
      },
    });

    if (verifyEmail) {
      return res.status(400).json({
        message: 'User already exist!',
      });
    }
    const user = await User.create({
      name, user_name, email, avatar, bio, gender, password,
    });
    return res.send({ user });
  }
}
module.exports = new UserController();
