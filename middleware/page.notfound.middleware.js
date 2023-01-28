//* 유효하지 않은 URL로 접속을 시도 할 경우
module.exports = ((req, res, next) => {
  res.status(404).json({ errorMessage: '페이지를 찾을수 없습니다.' });
});