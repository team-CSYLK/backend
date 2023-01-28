class CommentRepository {
  constructor(CommentsModel) {
    this.commentsModel = CommentsModel;
  }

  createComment = async (data) => {
    const { userId, postId, commentContent } = data;

    const result = await this.commentsModel.create({
      userId,
      postId,
      commentContent,
    });
    return result;
  };

  updateComment = async (data) => {
    const { commentId, commentContent } = data;

    const result = await this.commentsModel.update(
      { commentContent },
      { where: { commentId } }
    );

    return result;
  };

  deleteComment = async (data) => {
    const { commentId } = data;

    const result = await this.commentsModel.destroy({
      where: { commentId },
    });
    return result;
  };
}

module.exports = CommentRepository;
