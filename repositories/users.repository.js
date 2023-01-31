const { Users, Posts, Refereshtoken } = require('../models');
class UsersRepository {
  findUser = async (userId) => {
    const user = await Users.findByPk(userId);

    return user;
  };

  findNick = async (nickname) => {
    const nicknameEx = await Users.findOne({ where: { nickname } });

    return nicknameEx;
  };

  findByuserId = async (userId) => {
    const posts = await Posts.findAll({ where: { userId } });

    return posts;
  };

  createNickname = async (nickname, userId) => {
    const setNickname = await Users.update({ nickname }, { where: { userId } });
    const newNickname = await Users.findOne({ where: { userId: setNickname } });

    return newNickname.nickname;
  };

  findByEmail = async (email) => {
    const user = await Users.findOne({
      where: {
        email,
      },
    });
    return user;
  };

  findKakaoUser = async (snsId) => {
    const exUser = await Users.findOne({ where: { snsId } });

    return exUser;
  };

  createKakaoUser = async (email, name, imageProfile, snsId, provider) => {
    const newUser = await Users.create({
      email: email,
      name: name,
      imageProfile: imageProfile,
      snsId: snsId,
      provider: provider,
    });
    return newUser;
  };

  findUserToken = async (userId) => {
    return await Refereshtoken.findOne({ where: { userId } });
  };

  updateToken = async (refreshToken, userId) => {
    return await Refereshtoken.update({ refreshToken }, { where: { userId } });
  };

  createToken = async (refreshToken, userId) => {
    return await Refereshtoken.create({ refreshToken, userId });
  };

  setUserProfile = async (userId, name, nickname, introduce, imageProfile) => {
    await Users.update(
      { name, nickname, introduce, imageProfile },
      { where: { userId } }
    );

    return;
  };
}
module.exports = UsersRepository;
