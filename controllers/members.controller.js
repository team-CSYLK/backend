require('express-async-errors')
const MembersService = require('../services/members.service');
const { InvalidParamsError } = require('../helper/http.exception.helper');

const joi = require('../helper/joiSchema.js');

class MembersController {
  constructor() {
    this.membersService = new MembersService();
  }
  memberJoin = async (req, res, next) => {

    try {
      const result = joi.memberSchema.validate(req.body);
      console.log(result.value)

      if (result.error) throw new InvalidParamsError('아이디와 비밀번호는 영문 대/소문자,숫자로 구성된 4글자 이상으로 조합해주세요.');

      const { memberId, password, nickname } = result.value;
      console.log(memberId, password, nickname);
      const createMember = await this.membersService.createMember(
        memberId,
        password,
        nickname
      );

      res.status(201).json({ msg: '회원가입에 성공하였습니다.' });
    } catch (error) {
      next(error);
    }
  };

  memberLogin = async (req, res, next) => {
    try {
      const { memberId, password } = req.body;

      const member = await this.membersService.loginMember(memberId, password);

      console.log(member[0].nickname)

      res.header('access_token', member[1]); // Access Token을 Cookie에 전달한다.
      res.status(200).json({
        nickname: member[0].nickname,
      });
    } catch (error) {
      next(error);
    }
  };

  duplication = async (req, res, next) => {
    try {
      const { memberId } = req.body;
      console.log(memberId)
      const duplication = await this.membersService.duplication(memberId);

      res.status(200).json({ msg: '사용가능한 아이디 입니다.' });
    } catch (error) {
      next(error);
    }
  };

  nicknameduplication = async (req, res, next) => {
    try {
      const { nickname } = req.body;
      console.log(nickname)
      const nicknameduplication = await this.membersService.nicknameduplication(nickname);

      res.status(200).json({ msg: '사용가능한 닉네임 입니다.' });
    } catch (error) {
      next(error);
    }
  };

  memberConfirm = async (req, res, next) => {
    try {
      const { mId, memberId } = res.locals.member;
      const { access_token } = res.locals;

      const existMember = await this.membersService.confirmMember(mId);

      if (existMember.refreshToken === refreshToken) {
        res.status(200).json({
          ok: true,
          msg: '로그인 유저 정보 확인',
          access_token,
          refreshToken: existMember.refreshToken,
        });
      }
    } catch (error) {
      next(error);
    }
  };
}
module.exports = MembersController;
