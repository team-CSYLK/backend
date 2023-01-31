const CommentsRepository = require('../repositories/comments.repository');

const error = new Error();
const success = {};
error.status = 400;

class CommentService {
  commentsRepository = new CommentsRepository();

  //*댓글작성
  createComment = async (commentContent, postId, userId) => {
    const exPost = await this.commentsRepository.findPost(postId);

    try {
      if (!commentContent) {
        error.status = 412;
        error.message = {
          statusCode: 412,
          errorMessage: '댓글 내용을 입력해주세요.',
        };
        throw error;
      } else if (!exPost) {
        error.status = 404;
        error.message = {
          statusCode: 404,
          errorMessage: '해당 게시글이 존재하지 않습니다',
        };
        throw error;
      }

      await this.commentsRepository.createComment(
        commentContent,
        postId,
        userId
      );

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
  updateComment = async (commentId, commentContent, userId) => {
    const findComment = await this.commentsRepository.findOneComment(commentId);
    console.log(userId, findComment.userId);

    try {
      if (!findComment) {
        error.status = 404;
        error.message = {
          statusCode: 404,
          errorMessage: '해당 댓글이 존재하지 않습니다',
        };
        throw error;
      } else if (findComment.userId !== Number(userId)) {
        error.status = 403;
        error.message = {
          statusCode: 403,
          errorMessage: '수정권한이 없습니다.',
        };
        throw error;
      } else {
        await this.commentsRepository.updateComment(
          commentId,
          commentContent,
          userId
        );
      }

      success.status = 201;
      success.message = {
        statusCode: 201,
        message: '댓글 수정에 성공했습니다.',
      };
      return success;
    } catch (error) {
      return error;
    }
  };

  //*댓글 삭제
  deleteComment = async (commentId, userId) => {
    const findOneComment = await this.commentsRepository.findOneComment(
      commentId
    );
    if (!findOneComment) {
      error.status = 404;
      error.message = {
        statusCode: 404,
        errorMessage: '해당 댓글이 존재하지 않습니다',
      };
      throw error;
    } else if (findOneComment.userId !== userId) {
      error.status = 403;
      error.message = {
        statusCode: 403,
        errorMessage: '삭제 권한이 없습니다',
      };
      throw error;
    }

    await this.commentsRepository.deleteComment(commentId);

    success.status = 200;
    success.message = {
      statusCode: 200,
      message: '댓글 삭제에 성공했습니다.',
    };
    return success;
  };
}
module.exports = CommentService;
