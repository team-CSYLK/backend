const express = require('express');
const router = express.Router();
const passport = require('passport');

const authRouter = require('./auth.routes');
const usersRouter = require('./users.routes');
// const postsRouter = require('./posts.routes');
// const commentsRouter = require('./comments.routes');

router.use('/auth', authRouter);
router.use('/', usersRouter);
// router.use('/posts' , postsRouter);
// router.use('/comments', commentsRouter);

module.exports = router;
