const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/login/kakao', passport.authenticate('kakao'));
router.get(
  '/login/kakao/callback',
  passport.authenticate('kakao', { failureRedirect: '/auth/login' }),
  async (req, res) => {
    console.log('callback login from kakao', req.user);
    const userId = req.user.userId;
    const access_token = jwt.sign({ userId: userId }, process.env.SECRETKEY, {
      expiresIn: '1d',
    });
    const nickname = req.user.nickname;
    res.header('Authorization', `Bearer ${access_token}`);
    res.header('nickname', nickname);
    res.redirect('/');
    // if (req.user.nickname === null) {
    //   res.redirect('/nickname');
    // } else {
    //   res.redirect('/');
    // }
  }
);

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy();
    res.redirect('/');
  });
});

module.exports = router;
