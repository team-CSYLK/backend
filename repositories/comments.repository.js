<<<<<<< HEAD
const { Comments } = require('../models');
class CommentRepository {
  createComment = async (data) => {
    const { userId, postId, commentContent } = data;

    const result = await Comments.create({
=======
const { Comments } = require('../models/');

class CommentRepository extends Comments {
  constructor() {
    super();
  }
  //*댓글작성
  createComment = async ({ commentContent, postId, userId }) => {
    const createComment = await Comments.create({
      commentContent,
>>>>>>> 8cd385feea068d8f6d360fe04e3727b43aa4d007
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

<<<<<<< HEAD
  updateComment = async (data) => {
    const { commentId, commentContent } = data;

    const result = await Comments.update(
=======
  //*댓글수정
  updateComment = async ({ userId, commentContent, commentId }) => {
    const updateComment = await Comments.update(
>>>>>>> 8cd385feea068d8f6d360fe04e3727b43aa4d007
      { commentContent },
      { where: { commentId: commentId, userId: userId } }
    );
    return updateComment;
  };
<<<<<<< HEAD

  deleteComment = async (data) => {
    const { commentId } = data;

    const result = await Comments.destroy({
=======
  //*댓글 삭제
  deleteComment = async ({ commentId }) => {
    const deleteComment = await Comments.destroy({
>>>>>>> 8cd385feea068d8f6d360fe04e3727b43aa4d007
      where: { commentId },
    });
    return deleteComment;
  };
}
<<<<<<< HEAD

=======
>>>>>>> 8cd385feea068d8f6d360fe04e3727b43aa4d007
module.exports = CommentRepository;
