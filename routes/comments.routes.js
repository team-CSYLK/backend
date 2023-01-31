const express = require('express');
const router = express.Router();

const CommentsController = require('../controllers/comments.controller');
const commentsController = new CommentsController();

router.post('/:postId', commentsController.createComment); // 댓글 작성
<<<<<<< HEAD
router.patch('/:comment', commentsController.updateComment); // 댓글 수정
router.delete('/:comment', commentsController.deleteComment); // 댓글 삭제
=======
router.put('/:commentId', commentsController.updateComment); // 댓글 수정
router.delete('/:commentId', commentsController.deleteComment); // 댓글 삭제
>>>>>>> 8cd385feea068d8f6d360fe04e3727b43aa4d007

module.exports = router;
