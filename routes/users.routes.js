const express = require('express');
const router = express.Router();
const tokenMiddleware = require('../middleware/token-middleware');

const UsersController = require('../controllers/users.controller');
const usersController = new UsersController();

router.post('/nickname', tokenMiddleware, usersController.userNickname);

module.exports = router;
