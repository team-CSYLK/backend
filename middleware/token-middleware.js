require('dotenv').config();
const { Unauthorized } = require('../exceptions/index.exception');
const jwt = require('jsonwebtoken');

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
  if (!access_token) throw new Unauthorized('');

  //엑세스 토큰만 뽑아내고 디코딩작업 및 verify 작업
  const authToken = access_token.split(' ')[1];
  const decodedAccessToken = jwt.decode(authToken);
  const validateAcessToken = verifyToken(authToken);

  console.log('데헷' + authToken);

  console.log('데헷' + validateAcessToken);

  console.log('데헷' + decodedAccessToken);
  //검증 후 userId 뽑아내서 다음 작업으로 이동
  if (validateAcessToken) {
    res.locals.userId = decodedAccessToken.userId;
    next();
    console.log('데헷');
  }
  //* 분기 2. token의 검증에 실패 했을경우.

  //* token을 decode 하여 memberId를 받아옴.

  //* memberId를 이용하여 데이터 베이스의 token 테이블에서 refreshToken이 존재하는지 확인함.
  // const findRefreshToken = await RefreshToken.findOne({
  //   where: { mId: decodedAccessToken.mId },
  // });
  // const refreshToken = findRefreshToken ? findRefreshToken.refreshToken : false;

  // //* 변수를 만들어서 refreshToken이 존재할 경우에 refreshToken을 담아두고 존재하지 않을경우 false를 담아줌.
  // if (verifyToken(refreshToken)) {
  //   const newAccessToken = jwt.sign(
  //     { mId: decodedAccessToken.mId },
  //     process.env.SECRETKEY,
  //     { expiresIn: '1d' }
  //   );
  //   res.header('Authorization', `Bearer ${newAccessToken}`);
  //   res.locals.mId = decodedAccessToken.mId;
  //   next();
  //   return;
  // }

  // throw new Unauthorized('');
};

//* 분기 2-1. refreshToken을 담은 변수의 검증에 성공했을경우.
//* 새로운 access_token을 발급해줌.
//* res 에 access_token을 넣어줌.
// 분기 2-1 끝
//* token의 검증에 실패했고 , refreshToken의 검증에도 실패한 경우
// 이상한놈일세.
