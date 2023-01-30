const { Users } = require('../models');

class UsersRepository {
  findUser = async (userId) => {
    const user = await Users.findByPk(userId);

    return user;
  };

  findNick = async (nickname) => {
    // console.log(nickname);
    const nicknameEx = await Users.findOne({ where: { nickname } });

    // console.log(nicknameEx);

    return nicknameEx;
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

  findUser = async (email, password) => {
    const user = await User.findOne({
      where: {
        [Op.and]: [{ email }, { password }],
      },
    });

    return user;
  };

  findByEmail = async (email) => {
    const user = await Users.findOne({
      where: {
        email,
      },
    });
    return user;
  };

}
module.exports = UsersRepository;
