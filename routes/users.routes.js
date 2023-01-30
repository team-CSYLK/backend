const express = require('express');
const router = express.Router();

const tokenMiddleware = require('../middleware/token-middleware');
const loginAuthMiddleware = require("../middleware/loginAuthMiddleware");

const UsersController = require('../controllers/users.controller');
const usersController = new UsersController();


router.post('/sendNickname', tokenMiddleware, usersController.userNickname);
router.get('/user/:nickname', tokenMiddleware, usersController.userProfile);

//회원가입
router.post('/signup', loginAuthMiddleware, usersController.signup);

//로그인
router.post('/login', loginAuthMiddleware, usersController.login);

module.exports = router;
