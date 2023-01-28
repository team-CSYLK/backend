const express = require('express');
const router = express.Router();
//미들웨어 추가하세용

const CommentController = require('../controllers/comment.controller');
const commentController = new CommentController();

router.post('/:qId', commentController.createComment); //댓글 생성 router
router.get('/:qId', commentController.getAllComments); //댓글 조회 router
router.put('/:cId', commentController.updateComment); //댓글 수정 router
router.delete('/:cId', commentController.deleteComment); //댓글 삭제 router

router.put('/like/:cId', commentController.commentLikeEvent); //댓글 좋아요 router

module.exports = router;
