const CommentsService = require('../services/comments.service');

class CommentsController {
  commentsService = new CommentsService();

  /**댓글 작성 컨트롤러 */
  createComment = async (req, res) => {
    const { commentContent } = req.body;
    const { postId } = req.params;
    const userId = res.locals.userId;

    const comment = await this.commentsService.createComment(
      commentContent,
      postId,
      userId
    );

    return res.status(comment.status || 400).json(comment.message);
  };

  /**댓글 수정 컨트롤러 */
  updateComment = async (req, res) => {
    const { commentId } = req.params;
    const { commentContent } = req.body;
    const userId = res.locals.userId;

    const editcomment = await this.commentsService.updateComment(
      commentId,
      commentContent,
      userId
    );

    return res.status(editcomment.status || 400).json(editcomment.message);
  };

  /**댓글 삭제 컨트롤러 */
  deleteComment = async (req, res, next) => {
    const { commentId } = req.params;
    const userId = res.locals.userId;
    const commentContent = await this.commentsService.deleteComment(
      commentId,
      userId
    );

    return res
      .status(commentContent.status || 400)
      .json(commentContent.message);
  };
}

module.exports = CommentsController;
