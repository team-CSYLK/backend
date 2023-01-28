const express = require('express');
const router = express.Router();

// const usersRouter = require('./users.routes');
// const postsRouter = require('./posts.routes');
const commentsRouter = require('./comments.routes');

// router.use('/user', usersRouter);
// router.use('/posts', postsRouter);
router.use('/comments', commentsRouter);

module.exports = router;
