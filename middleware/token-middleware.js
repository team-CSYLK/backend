require('dotenv').config();
const jwt = require('jsonwebtoken');

function verifyToken(access_token) {
  try {
    return jwt.verify(access_token, process.env.SECRETKEY);
  } catch {
    return false;
  }
}

module.exports = async (req, res, next) => {
  const access_token = req.header('Authorization');

  // console.log(access_token);

  if (!access_token) throw new Unauthorized('');

  const authToken = access_token.split(' ')[1];
  const decodedAccessToken = jwt.decode(authToken);
  //* Client 에서 access_token 과 함께. API 요청이 들어옴.
  //* token이 들어오지 않을경우.
  //* 에러처리.

  //* token이 들어온경우.
  //* token을 검증 해서 분기처리를 해줘야함.
  const validateAcessToken = verifyToken(authToken);

  // console.log(decodedAccessToken);

  if (validateAcessToken) {
    //* 분기 1. token의 검증에 성공했을경우.
    //* next()를 이용하여 API 비지니스 로직으로 이동.
    //* 분기 1 끝.
    res.locals.userId = decodedAccessToken.userId;
    next();
    return;
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
