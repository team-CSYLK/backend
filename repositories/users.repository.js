const { Users, Posts } = require('../models');
class UsersRepository {
  findUser = async (userId) => {
    const user = await Users.findByPk(userId);

    return user;
  };

  findNick = async (nickname) => {
    const nicknameEx = await Users.findOne({ where: { nickname } });
    console.log(nicknameEx);

    return nicknameEx;
  };

  findByuserId = async (userId) => {
    const posts = await Posts.findAll({ where: { userId } });

    console.log(posts);

    return posts;
  };

  createNickname = async (nickname, userId) => {
    const newNickname = await Users.update({ nickname }, { where: { userId } });

    return newNickname;
  };

  createUser = async ({ email, name, nickname, password }) => {
    await Users.create({
      email,
      name,
      nickname,
      password,
    });
    return;
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
}
module.exports = UsersRepository;
