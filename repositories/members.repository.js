const { Member } = require('../models');

class MembersRepository {
  // memeber 가입
  createMember = async (memberId, password, nickname) => {
    console.log(memberId, password, nickname);
    const createMember = await Member.create({ memberId, password, nickname });
  
    return createMember;
  };

  // member 가입 시 닉네임 중복확인
  findOneNickname = async (nickname) => {
    const findOneId = await Member.findOne({ where: { nickname } });

    return findOneId;
  };

  // memberId 중복확인
  findOneId = async (memberId) => {
    const findOneId = await Member.findOne({ where: { memberId } });

    return findOneId;
  };

  findOnePw = async (password) => {
    const findOnePw = await Member.findOne({ where: { password } });

    return findOnePw;
  };

  // 이미 로그인된 memeber 확인
  findOneMember = async (memberId) => {
    const findOneMember = await Member.findOne({ where: { memberId } });

    return findOneMember;
  };

  // 새 리프레쉬 토큰 발급
  updateRefresh = async (refreshToken, member) => {
    await Member.update(
      { refreshToken },
      { where: { memverId: member.memberId } }
    );
  };
}

module.exports = MembersRepository;
