const CommentRepository = require('../repositories/comment.repository');
const { Comment, Quiz, Member, CommentLike } = require('../models');

class CommentService {
  commentRepository = new CommentRepository(Comment, Quiz, Member, CommentLike);

  createComment = async (mId, qId, nickname, comment) => {
    return await this.commentRepository.createComment(
      mId,
      qId,
      nickname,
      comment
    );
  };

  getAllComments = async (qId) => {
    return await this.commentRepository.getAllComments(qId);
  };

  updateComment = async (cId, comment) => {
    return await this.commentRepository.updateComment(cId, comment);
  };

  deleteComment = async (cId) => {
    return await this.commentRepository.deleteComment(cId);
  };

  commentLikeEvent = async (cId, mId, commentLikeStatus) => {
    const cLike = await this.commentRepository.findCommentLike(cId, mId);

    if (cLike) {
      if (cLike.commentLikeStatus === commentLikeStatus) {
        return await this.commentRepository.delteCommentLike(cLike.cLId);
      }

      return await this.commentRepository.updateCommentLike(
        cLike.cLId,
        commentLikeStatus
      );
    }

    return await this.commentRepository.createCommentLike(
      cId,
      mId,
      commentLikeStatus
    );
  };
}

module.exports = CommentService;
