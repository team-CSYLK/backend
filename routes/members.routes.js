const express = require('express');
const router = express.Router();
const MembersController = require('../controllers/members.controller');
const authLoginMiddleware = require('../middleware/authLoginMiddleware');
const authMiddleware = require('../middleware/auth-middleware');
const membersController = new MembersController();

// member 가입
router.post('/join', authLoginMiddleware, membersController.memberJoin);

// member 로그인
router.post('/login', authLoginMiddleware, membersController.memberLogin);

// memeber 가입 아이디 중복 체크
router.post('/join/check/Id', authLoginMiddleware, membersController.duplication);

// member 가입 닉네임 중복 체크
router.post('/join/check/nickname', authLoginMiddleware, membersController.nicknameduplication);

// member 이미 인증된 유저 (좀 더 고민이 필요함)
// router.get('/confirm', authMiddleware, membersController.memberConfirm);


module.exports = router;
