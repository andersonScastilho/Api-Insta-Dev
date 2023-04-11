const Post = require("../models/Post");

class LikeController {
  async store(req, res) {
    const { id } = req.params;

    const post = await Post.findOne({
      where: { id },
    });

    if (!post) {
      return res.staust(400).json({
        error: "Post not exists!",
      });
    }

    const postUpdatedLikes = await post.update(
      { number_likes: post.number_likes + 1 },
      {
        where: {
          id,
        },
      }
    );
    if (!postUpdatedLikes) {
      return res.status(400).json({
        error: "Failed to add like in this post",
      });
    }

    return res.status(200).json({
      message: "Like storaged!",
    });
  }
}
module.exports = new LikeController();
