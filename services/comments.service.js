const CommentRepository = require('../repositories/comments.repository');

class CommentService {
  commentRepository = new CommentRepository();

  createComment = async (data) => {
    return await this.commentRepository.createComment(data);
  }

  updateComment = async (data) => {
    return await this.commentRepository.updateComment(data);
  }

  deleteComment = async (data) => {
    return await this.commentRepository.deleteComment(data);
  }
}

module.exports = CommentService;