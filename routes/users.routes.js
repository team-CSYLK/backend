const express = require('express');
const router = express.Router();

const tokenMiddleware = require('../middleware/token-middleware');
const loginAuthMiddleware = require('../middleware/loginAuthMiddleware');

const UsersController = require('../controllers/users.controller');
const usersController = new UsersController();

router.post('/sendNickname', tokenMiddleware, usersController.userNickname);
router.get('/user/:nickname', usersController.userProfile);
router.post('/kakao/code', usersController.userKakao);

module.exports = router;
