const express = require('express');
const router = express.Router();
const userUpload = require('../modules/users.multer');

const tokenMiddleware = require('../middleware/token-middleware');

const UsersController = require('../controllers/users.controller');
const usersController = new UsersController();

router.post('/sendNickname', tokenMiddleware, usersController.userNickname);
router.get('/user/:nickname', usersController.userProfile);
router.post('/kakao/code', usersController.userKakao);
router.get('/editProfile', tokenMiddleware, usersController.getUserProfile);
router.put(
  '/editProfileImage',
  tokenMiddleware,
  userUpload.array('image', 1),
  usersController.setUserProfile
);

module.exports = router;
