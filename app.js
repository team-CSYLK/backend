require('dotenv').config();
const express = require('express');
const cookieParesr = require('cookie-parser');
const indexRouter = require('./routes');
const cors = require('cors');
const HttpExceptionFilter = require('./middleware/http.exception.middleware');
const NotFoundFilter = require('./middleware/page.notfound.middleware');

const app = express();

//* env 없을시 3000 포트로 설정.
const port = process.env.PORT || 3000;

//* Middleware
app.use(express.json());
app.use(cookieParesr());

//* CORS 설정.
app.use(cors({
  exposedHeaders: ['access_token']
}));

//* ./routes/index.js 연결
app.use('/', indexRouter);

//* HttpException Filter
//* 컨트롤러 계층 상단에 require('express-async-errors') 해주셔야
//* 에러처리가 가능합니다.

// //* 컨트롤러, 서비스 계층에서 throw 사용하면 이곳으로 와서 에러처리가 됩니다.
// app.use(HttpExceptionFilter);

// //* 가장 마지막에 거치는 미들웨어 입니다.
// //* 유효하지 않은 URL에 접속을 시도 할경우 404 에러처리를 해줍니다.
// app.use(NotFoundFilter);

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});