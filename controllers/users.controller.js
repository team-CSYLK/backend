const UsersService = require('../services/users.service');
const joi = require('../util/joi');
const bcrypt = require('bcrypt');
const {
  InvalidParamsError,
  ValidationError,
} = require("../exceptions/index.exception");
require("dotenv").config();

class UsersController {
  usersService = new UsersService();

  userNickname = async (req, res) => {
    const { nickname } = req.body;
    const userId = res.locals.userId;

    const checkNickname = /^[a-zA-Z0-9]{3,}$/;

    if (!checkNickname.test(nickname)) {
      throw error;
    }

    await this.usersService.createNickname(nickname, userId);

    res.sendStatus(201);
  };

  userProfile = async (req, res) => {
    const { nickname } = req.params;

    const profile = await this.usersService.findUser(nickname);

    res.status(201).json({ statusCode: 201, data: profile });
  };

  /**회원가입 컨트롤러 */
  signup = async (req, res, next) => {
    try {
      const { email, name, nickname, password } =
        await joi.signupSchema.validateAsync(req.body);

      if (!email || !name || !nickname || !password) {
        throw new InvalidParamsError('입력란을 확인해 주세요');
      }

      if (password.includes(nickname) || nickname.includes(password))
        throw new ValidationError('패스워드에 닉네임이 포함될수 없습니다.');

      // 비밀번호 hash
      const hashed = await bcrypt.hash(password, 12);
      const users = await Object.create({
        email: email,
        name: name,
        nickname: nickname,
        password: hashed,
      });

      // hash된 유저 정보를 service로 전달
      // 서비스 계층에 구현된 createUser 로직을 실행합니다.
      await this.usersService.createUser(users);
      res.status(201).json({ ok: true, message: '회원가입 성공.' });
    } catch (error) {
      next(error);
    }
  };

  /**로그인 컨트롤러 */
  login = async (req, res, next) => {
    try {
      const { email, password } = await joi.loginSchema.validateAsync(req.body);
      // console.log(email, password);
      if (!email || !password) {
        throw new InvalidParamsError('입력란을 확인해주세요');
      }

      const { accessToken, refreshToken, userId } =
        await this.usersService.verifyUser(email, password);
      /**쿠키에 Token전송 */
      res.cookie('refreshToken', refreshToken);
      res.cookie('accessToken', accessToken);

      return res
        .status(200)
        .json({ accessToken, refreshToken, userId, message: '로그인 성공.' });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UsersController;
