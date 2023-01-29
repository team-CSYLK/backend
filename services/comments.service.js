const CommentRepository = require('../repositories/comments.repository');
const { comments } = require('../models');

class CommentService {
  // comments DB 모델 생성자 주입
  commentRepository = new CommentRepository(comments);

  createComment = async (data) => {
    return await this.commentRepository.createComment(data);
  };

  updateComment = async (data) => {
    return await this.commentRepository.updateComment(data);
  };

  deleteComment = async (data) => {
    return await this.commentRepository.deleteComment(data);
  };
}

module.exports = CommentService;
