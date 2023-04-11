const Post = require("../models/Post");

class PostController {
  async store(req, res) {
    const { image, description } = req.body;

    const newPost = await Post.create({
      image,
      description,
      author_id: req.userId,
    });

    if (!newPost) {
      return res.status(400).json({ error: "Created post failed!" });
    }

    return res.status(200).json({
      data: image,
      description,
    });
  }
  async delete(req, res) {
    const { id } = req.id;

    const post = Post.find({
      where: { id },
    });

    if (!post) {
      return res.status(404).json({
        error: "Post not exists!",
      });
    }
    if (post.author_id !== req.userId) {
      return res.status(401).json({
        error: "You dont't have permission to delete this post!",
      });
    }

    const deletedPost = await Post.destroy({
      where: {
        id,
      },
    });

    if (!deletedPost) {
      return res.status(400).json({
        error: "Failed to delete this post!",
      });
    }

    return res.status(200).json({ message: "Post deleted" });
  }
}
module.exports = new PostController();
