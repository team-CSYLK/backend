require('dotenv').config();
const jwt = require('jsonwebtoken');
const { Member } = require('../models');
const { InvalidParamsError } = require('../helper/http.exception.helper');

module.exports = async (req, res, next) => {
  try {
    const access_token = req.cookies.access_token;
    const refreshToken = req.cookies.refreshToken;

    if (!access_token || !refreshToken) {
      throw new InvalidParamsError('로그인 후 사용해주세요.');
    }

    let accessVerified = null;
    let refreshVerified = null;

    try {
      accessVerified = jwt.verify(access_token, process.env.SECRETKEY);
    } catch (error) {
      accessVerified = null;
    }
    try {
      refreshVerified = jwt.verify(refreshToken, process.env.SECRETKEY);
    } catch (error) {
      refreshVerified = null;
    }

    try {
      // 1.access토큰, refresh토큰 모두 사용 불가
      if (!accessVerified && !refreshVerified) {
        throw new InvalidParamsError('로그인 기한이 만료되었습니다.');
      }
      // 2.access토큰은 만료되었지만 refresh토큰이 존재한다면 access_token 발급
      if (!accessVerified && refreshVerified) {
        const existMember = await Member.findOne({
          where: { refreshToken: refreshToken },
        });

        if (!existMember) {
          throw new InvalidParamsError('로그인 기한이 만료되었습니다.');
        }

        // access_token 발급
        const mId = existMember.mId;

        const newaccess_token = jwt.sign({ mId }, process.env.SECRETKEY, {
          expiresIn: '1d',
        });
        console.log(newaccess_token, 'newaccess_token 확인');
        res.cookies('accesToken', newaccess_token);

        return res.status(201).json({
          access_token: newaccess_token,
          refreshToken: refreshToken,
          msg: 'acceess 토큰이 재발급 되었습니다.',
        });
      }

      // 3.access토큰은 있지만, refresh토큰 사용 불가하다면 refreshToken 발급
      if (accessVerified && !refreshVerified) {
        const { mId } = accessVerified;

        const existMember = await Member.findOne({ where: { mId } });
        if (!existMember) {
          throw new InvalidParamsError(401, '로그인 기한이 만료되었습니다.');
        }

        // refreshToken 발급
        const newRefreshToken = jwt.sign({ mId }, process.env.SECRETKEY, {
          expiresIn: '21d',
        });
        console.log(newRefreshToken, 'newRefreshToken 확인');

        await Member.update(
          { refreshToken: newRefreshToken },
          { where: { mId } }
        );
        res.cookies('refreshToken', newRefreshToken);

        return res.status(201).json({
          access_token: access_token,
          refreshToken: newRefreshToken,
          msg: 'refresh 토큰이 재발급 되었습니다.',
        });
      }

      if (accessVerified && refreshVerified) {
        const { mId } = accessVerified;
        Member.findOne({
          where: { mId },
          attributes: ['mId', 'memberId'],
        }).then((member) => {
          res.locals.member = member;
          next();
        });
      }
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};
