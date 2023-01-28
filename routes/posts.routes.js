const express = require('express');
const router = express.Router();
const upload = require('../modules/posts.multer');

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

const UploadController = require('../controllers/upload.controller');
const uploadController = new UploadController();

// post 작성 페이지
// post 업로드
router.post('/', upload.array('image', 5), uploadController.createPosts);

// 홈화면에서 사용될 기능들
// post 조회
router.get('/', postsController.readPost);
// post 수정
router.put('/:postId', postsController.updatePost);
// post 삭제
router.delete('/:postId', postsController.deletePost);
// post 상세 조회
router.get('/:postId', postsController.detailPost);
// post 좋아요
// router.put('/like/:postId', postsController.likePost);

module.exports = router;
