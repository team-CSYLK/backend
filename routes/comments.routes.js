const express = require('express');
const router = express.Router();

const CommentsController = require('../controllers/comments.controller');
const commentsController = new CommentsController();

router.post('/:postId', commentsController.createComment); // 댓글 작성
router.patch('/:comment', commentsController.updateComment); // 댓글 수정
router.delete('/:comment', commentsController.deleteComment); // 댓글 삭제
