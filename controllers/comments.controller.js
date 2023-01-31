const CommentsService = require('../services/comments.service');
class CommentsController {
  commentsService = new CommentsService();
  /**댓글 작성 컨트롤러 */
  createComment = async (req, res, next) => {
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
  updateComment = async (req, res, next) => {
    try {
      const commentId = req.params;
      const { commentContent } = req.body;
      const userId = res.locals.userId;

      const editcomment = await this.commentsService.updateComment(
        commentId,
        commentContent,
        userId
      );
      res
        .status(200)
        .json({ data: editcomment, massage: '댓글을 수정하였습니다.' });
    } catch (error) {
      next(error);
    }
  };

  /**댓글 삭제 컨트롤러 */
  deleteComment = async (req, res, next) => {
    try {
      const { commentId } = 1;
      const userId = res.locals.userId;
      const commentContent = await this.commentsService.deleteComment(
        commentId,
        userId
      );
      console.log(commentContent);
      res
        .status(200)
        .json({ data: commentContent, msg: '댓글을 삭제했습니다.' });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = CommentsController;
