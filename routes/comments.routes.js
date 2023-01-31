const express = require('express');
const router = express.Router();
const tokenMiddleware = require('../middleware/token-middleware');

const CommentsController = require('../controllers/comments.controller');
const commentsController = new CommentsController();

router.post('/:postId', tokenMiddleware, commentsController.createComment); // 댓글 작성
router.put('/:commentId', tokenMiddleware, commentsController.updateComment); // 댓글 수정
router.delete('/:commentId', tokenMiddleware, commentsController.deleteComment); // 댓글 삭제

module.exports = router;
