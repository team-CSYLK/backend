//https버젼으로 배포용
require('dotenv').config();
const express = require('express');
const cookieParesr = require('cookie-parser');
const indexRouter = require('./routes');
const cors = require('cors');
const http = require('http');
const http2 = require('http2');
const fs = require('fs');
const http2Express = require('http2-express-bridge');

const app = http2Express(express);
// const app = express();
const port = process.env.PORT || 3000;
const http2Port = process.env.HTTP2_PORT || 4000;

app.use(express.json());
app.use(cookieParesr());
app.use(express.static('public'));

//* http2 설정을 위한 Option 설정 (배포시에만 열어)
// const options = {
//   ca: fs.readFileSync('/etc/letsencrypt/live/becool0514.shop/fullchain.pem'),
//   key: fs.readFileSync('/etc/letsencrypt/live/becool0514.shop/privkey.pem'),
//   cert: fs.readFileSync('/etc/letsencrypt/live/becool0514.shop/cert.pem'),
//   allowHTTP1: true,
// };

//임시 소셜 로그인 버튼
app.get('/', (req, res) => {
  /**
   * req.user가 있는 경우는 소셜 로그인에 성공한 경우
   * passport에 의해 user가 주입됨 (deserialize 확인)
   */
  if (req.user) {
    res.send(`
        <h3>Login Success</h3>
        <a href="/auth/logout">Logout</a>
        <p>
            ${JSON.stringify(req.user, null, 2)}
        </p>
      `);
  } else {
    res.send(`
        <h3>Node Passport Social Login</h3>
        <a href="/auth/login/google">Login with Google+</a>
        <a href="/auth/login/facebook">Login with Facebook</a>
        <a href="/auth/login/naver">Login with Naver</a>
        <a href="/auth/login/kakao">Login with Kakao</a>
    `);
  }
});

// const corsOption = {
//   origin: '*',
//   exposedHeaders: ['Authorization', 'nickname'],
//   credentials: true,
// };

//* CORS 설정.(배포시에만 열어)
// app.use(cors(corsOption));

app.use('/', indexRouter);

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});

//(배포시에만 열어)
// http.createServer(app).listen(port);

// http2.createSecureServer(options, app).listen(http2Port, () => {});

//서버에서 확인용
