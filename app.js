require('dotenv').config();
const express = require('express');
const indexRouter = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/', indexRouter);

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});
