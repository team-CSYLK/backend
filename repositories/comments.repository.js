const { Comments } = require('../models/');

class CommentRepository extends Comments {
  constructor() {
    super();
  }
  //*댓글작성
  createComment = async ({ commentContent, postId, userId }) => {
    const createComment = await Comments.create({
      commentContent,
      userId,
      postId,
    });
    return createComment;
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
