const express = require('express');
const router = express.Router();
const upload = require('../modules/posts.multer');
const authMiddleware = require("../middleware/authMiddleware");

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

// post 업로드
router.post('/upload', authMiddleware , upload.array('image',1), postsController.createPosts);
// post 조회
router.get('/', authMiddleware, postsController.readPost);
// post 수정
router.put('/:postId', authMiddleware, postsController.updatePost);
// post 삭제
router.delete('/:postId', authMiddleware, postsController.deletePost);
// post 상세 조회
router.get('/:postId', authMiddleware, postsController.detailPost);
//post 좋아요
router.put('/like/:postId', postsController.likePost);

module.exports = router;
