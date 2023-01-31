const { Comments } = require('../models');
class CommentRepository {
  createComment = async (data) => {
    const { userId, postId, commentContent } = data;

    const result = await Comments.create({
      userId,
      postId,
      commentContent,
    });
    return result;
  };

  updateComment = async (data) => {
    const { commentId, commentContent } = data;

    const result = await Comments.update(
      { commentContent },
      { where: { commentId } }
    );

    return result;
  };

  deleteComment = async (data) => {
    const { commentId } = data;

    const result = await Comments.destroy({
      where: { commentId },
    });
    return result;
  };
}

module.exports = CommentRepository;
