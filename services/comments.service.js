const { ValidationError } = require('sequelize');
const CommentsRepository = require('../repositories/comments.repository');

class CommentService {
  constructor() {
    this.commentsRepository = new CommentsRepository();
  }

  //*댓글작성
  createComment = async ({ commentContent, postId, userId }) => {
    const createComment = await this.commentsRepository.createComment({
      commentContent,
      postId,
      userId,
    });
    return createComment;
  };

  //*댓글 수정
  updateComment = async ({ userId, commentContent, commentId }) => {
    const findComment = await this.commentsRepository.findOneComment({
      commentId,
    });
    console.log(findComment);
    if (!findComment) {
      throw new ValidationError('잘못된 요청입니다.');
    }
    if (findComment.userId === userId)
      return await this.commentsRepository.updateComment({
        userId,
        commentContent,
        commentId:1,
      });
  };

  //*댓글 삭제
  deleteComment = async ({ commentId , userId }) => {
    const findOneComment = await this.commentsRepository.findOneComment({
      commentId,
    });
    if (!findOneComment) {
      throw new ValidationError('잘못된 요청입니다.');
    }
    if (findOneComment.userId === userId) {
      return await this.commentsRepository.deleteComment({ commentId });
    }
  };
}
module.exports = CommentService;
