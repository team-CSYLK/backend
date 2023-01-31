const { Comments } = require('../models');
class CommentRepository {
  createComment = async (userId, postId, commentContent) => {
    const result = await Comments.create(userId, postId, commentContent);
    return result;
  };
  //*댓글 찾기
  findOneComment = async ({ commentId }) => {
    const comments = await Comments.findOne({ where: { commentId } });
    return comments;
  };

  //*댓글수정
  updateComment = async ({ userId, commentContent, commentId }) => {
    const updateComment = await Comments.update(
      { commentContent },
      { where: { commentId: commentId, userId: userId } }
    );
    return updateComment;
  };
  //*댓글 삭제
  deleteComment = async ({ commentId }) => {
    const deleteComment = await Comments.destroy({
      where: { commentId },
    });
    return deleteComment;
  };
}
module.exports = CommentRepository;
