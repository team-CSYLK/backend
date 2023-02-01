const { Comments, Posts } = require('../models');
class CommentRepository {
  //댓글의 게시글 찾기
  findPost = async (postId) => {
    const result = await Posts.findByPk(postId);

    return result;
  };

  //*댓글 작성하기
  createComment = async (userId, postId, commentContent) => {
    const result = await Comments.create(userId, postId, commentContent);

    return result;
  };
  //*댓글 찾기
  findOneComment = async (commentId) => {
    const comments = await Comments.findOne({ where: { commentId } });

    return comments;
  };

  //*댓글수정
  updateComment = async (commentId, commentContent, userId) => {
    const updateComment = await Comments.update(
      { commentContent },
      { where: { commentId: commentId, userId: userId } }
    );

    return updateComment;
  };
  //*댓글 삭제
  deleteComment = async (commentId) => {
    const deleteComment = await Comments.destroy({
      where: { commentId },
    });

    return deleteComment;
  };
}
module.exports = CommentRepository;
