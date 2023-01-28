require('dotenv').config();
const express = require('express');
const cookieParesr = require('cookie-parser');
const indexRouter = require('./routes');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParesr());

//세션 세팅
const configureSession = require('./config/session');
configureSession(app);

//패스포트 새팅
const passport = require('passport');
const configurePassport = require('./config/passport')(app);
configurePassport(passport);



app.use('/', indexRouter);
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

//* CORS 설정.
app.use(
  cors({
    exposedHeaders: ['Authorization', 'nickname'],
    credential: 'true',
  })
);

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});
