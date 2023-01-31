const CommentsRepository = require('../repositories/comments.repository');

const error = new Error();
const success = {};
error.status = 400;

class CommentService {
  commentsRepository = new CommentsRepository();

  //*댓글작성
  createComment = async (commentContent, postId, userId) => {
    console.log(commentContent, postId, userId);
    const createComment = await this.commentsRepository.createComment({
      commentContent,
      postId,
      userId,
    });
    try {
      if (!commentContent) {
        error.status = 412;
        error.message = {
          statusCode: 412,
          errorMessage: '댓글 내용을 입력해주세요.',
        };
        throw error;
      } else if (!postId) {
        error.status = 404;
        error.message = {
          statusCode: 404,
          errorMessage: '해당 게시글이 존재하지 않습니다',
        };
        throw error;
      }

      success.status = 201;
      success.message = {
        statusCode: 201,
        message: '댓글작성에 성공했습니다.',
      };
      return success;
    } catch (error) {
      return error;
    }
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
        commentId: 1,
      });
  };

  //*댓글 삭제
  deleteComment = async ({ commentId, userId }) => {
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
