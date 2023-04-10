const Post = require('../models/Post');

class PostController {
  async store(req, res) {
    const { image, description } = req.body;

    const newPost = await Post.create({ image, description, author_id: req.userId });

    if (!newPost) {
      return res.status(400).json({ error: 'Created post failed!' });
    }

    return res.status(200).json({
      data: image, description,
    });
  }
}
module.exports = new PostController();
