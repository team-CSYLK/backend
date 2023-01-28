require('dotenv').config();
const MembersRepository = require('../repositories/members.repository')
const { ValidationError } = require('../helper/http.exception.helper');
const jwt = require('jsonwebtoken');


class MembersService {
  constructor() {
    this.membersRepository = new MembersRepository();
  }

  createMember = async (memberId, password, nickname) => {

    const findNickname = await this.membersRepository.findOneNickname(nickname);

    if (findNickname) throw new Error('회원 가입에 실패했습니다. 아이디/닉네임 중복체크를 확인해주세요.');

    await this.membersRepository.createMember(memberId, password, nickname);
  };

  loginMember = async (memberId, password) => {
    const member = await this.membersRepository.findOneId(memberId);

    if (!member) {
      throw new ValidationError('아이디가 잘못되었습니다.');
    }

    const memberPw = await this.membersRepository.findOnePw(password);

    if (!memberPw) {
      throw new ValidationError('패스워드가 잘못되었습니다.');
    }

    const access_token = jwt.sign(
      { mId: member.mId },
      process.env.SECRETKEY,
      { expiresIn: '1d' }
    );
    const refreshToken = jwt.sign(
      {},
      process.env.SECRETKEY,
      { expiresIn: '21d' }
    );

    await this.membersRepository.updateRefresh(refreshToken, member);

    return [member, access_token];
  };

  duplication = async (memberId) => {
    const findId = await this.membersRepository.findOneId(memberId);
    if (findId) {
      throw new ValidationError('이미 사용중인 아이디입니다.');
    }
  };

  nicknameduplication = async (nickname) => {
    const findId = await this.membersRepository.findOneNickname(nickname);
    if (findId) {
      throw new ValidationError('이미 사용중인 닉네임입니다.');
    }
  };


  confirmMember = async (memberId) => {
    const existMember = await this.membersRepository.findOneMember(memberId);

    return existMember;
  };
}

module.exports = MembersService;