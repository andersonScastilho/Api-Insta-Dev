const bcryptjs = require('bcryptjs');
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

  async update(req, res) {
    const {
      name, avatar, bio, gender, old_password, new_password, confirm_new_password,
    } = req.body;

    const user = await User.findOne({
      where: {
        id: req.userId,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not exist' });
    }

    let encryptedPassword = '';

    if (old_password) {
      if (!await user.checkPassword(old_password)) {
        return res.status(401).json({ error: 'Old password does not match!' });
      }
      if (!new_password || !confirm_new_password) {
        return res.status(401).json({ error: 'We need a new_password and confirm_new_password attributes' });
      }
      if (new_password !== confirm_new_password) {
        return res.status(401).json({ error: 'New password and confirm new password does not match!' });
      }
      encryptedPassword = await bcryptjs.hash(new_password, 8);
    }
    await User.update({
      name: name || user.name,
      avatar: avatar || user.avatar,
      bio: bio || user.bio,
      gender: gender || user.gender,
      password_hash: encryptedPassword || user.password_hash,
    }, {
      where: {
        id: user.id,
      },
    });
    return res.status(200).json({ message: 'User updated' });
  }

  async delete(req, res) {
    const userToDelete = await User.findOne({
      where: {
        id: req.userId,
      },
    });

    if (!userToDelete) {
      return res.status(401).json({ error: 'User not exist' });
    }

    await User.destroy({
      where: {
        id: req.userId,
      },
    });

    return res.status(200).json({ message: 'User deleted' });
  }
}
module.exports = new UserController();
