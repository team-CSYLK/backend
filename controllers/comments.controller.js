const CommentService = require('../services/comments.service');

class CommentsController {

  commentService = new CommentService();

  createComment = async (req, res, next) => {

    // 선언 파트
    const userId = 'temp_userId' 
    const { postId } = req.params; 
    const { commentContent } = req.body;
    
    // 구현 파트
    const comment = await this.commentService.createComment(
      userId,
      postId,
      commentContent
    );
    return res.status(201).json({ statusCode: "201", "message": '댓글 작성에 성공했습니다.' });
  }

  updateComment = async (req, res, next) => {

    // 선언 파트
    const userId = 'temp_userId' // todo - 토큰 작업 완료 시, userId PK 가져오는 것으로 수정할 것
    const { commentId } = req.params;
    const { commentContent } = req.body;
    
    // 구현 파트
    const updateComment = await this.commentService.updateComment(
      commentId,
      commentContent
    );
    return res.status(204).json({ statusCode: "204", "message": '댓글 수정에 성공했습니다.' });
  }

  deleteComment = async (req, res, next) => {

    // 선언 파트
    const userId = 'temp_userId' // todo - 토큰 작업 완료 시, userId PK 가져오는 것으로 수정할 것
    const { commentId } = req.params;

    // 구현 파트
    const deleteComment = await this.commentService.deleteComment(
      commentId
    );
    return res.status(204).json({ statusCode: "204", "message": '댓글 삭제에 성공했습니다.' });
  }

}

module.exports = CommentsController;