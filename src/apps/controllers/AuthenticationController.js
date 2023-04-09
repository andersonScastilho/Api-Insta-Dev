const jwt = require('jsonwebtoken');
const User = require('../models/User');

const { encrypt } = require('../../utils/crypt');

class AuthenticationController {
  async store(req, res) {
    const { email, user_name, password } = req.body;

    const whereClause = {};

    if (email) {
      whereClause.email = email;
    } else if (user_name) {
      whereClause.user_name = user_name;
    } else {
      return res.status(401).json({ error: 'we need email or password' });
    }

    const user = await User.findOne({
      where: whereClause,
    });

    if (!user) {
      return res.statu(404).json({
        error: 'User not found',
      });
    }

    if (!user.checkPassword(password)) {
      return res.status(401).json({ error: 'Password does not match!' });
    }

    const { id, user_name: username } = user;

    const { iv, content } = encrypt(id);

    const newId = `${iv}:${content}`;

    const token = jwt.sign({ newId }, process.env.HASH_BCRYPT, { expiresIn: `${process.env.EXPIRE_IN}` });

    return res.status(200).json({ user: { id, user_name: username }, token });
  }
}

module.exports = new AuthenticationController();
