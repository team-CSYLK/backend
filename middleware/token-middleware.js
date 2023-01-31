require('dotenv').config();
const jwt = require('jsonwebtoken');
const { Refereshtoken } = require('../models');

function verifyToken(access_token) {
  try {
    return jwt.verify(access_token, process.env.SECRETKEY);
  } catch {
    return false;
  }
}

module.exports = async (req, res, next) => {
  //헤더에 있는 엑세스 토큰 받아오기
  const access_token = req.header('Authorization');
  //엑세스 토근 없을 시에 에러 처리
  if (!access_token) throw error;

  //엑세스 토큰만 뽑아내고 디코딩작업 및 verify 작업
  const authToken = access_token.split(' ')[1];
  const decodedAccessToken = jwt.decode(authToken);
  const validateAcessToken = verifyToken(authToken);

  //검증 후 userId 뽑아내서 다음 작업으로 이동
  if (validateAcessToken) {
    res.locals.userId = decodedAccessToken.userId;
    next();
    return;
  }

  //디코딩하여 얻은 userId로 refreshtoken이 있는지 검사
  const findRefreshToken = await Refereshtoken.findOne({
    where: { userId: decodedAccessToken.userId },
  });
  const refreshToken = findRefreshToken ? findRefreshToken.refreshToken : false;

  // //* 변수를 만들어서 refreshToken이 존재할 경우에 refreshToken을 담아두고 존재하지 않을경우 false를 담아줌.
  if (verifyToken(refreshToken)) {
    const newAccessToken = jwt.sign(
      { userId: decodedAccessToken.userId },
      process.env.SECRETKEY,
      { expiresIn: '1d' }
    );
    res.header('Authorization', `Bearer ${newAccessToken}`);
    res.locals.userId = decodedAccessToken.userId;
    next();
    return;
  }

  throw error;
};

//* 분기 2-1. refreshToken을 담은 변수의 검증에 성공했을경우.
//* 새로운 access_token을 발급해줌.
//* res 에 access_token을 넣어줌.
// 분기 2-1 끝
//* token의 검증에 실패했고 , refreshToken의 검증에도 실패한 경우
// 이상한놈일세.
