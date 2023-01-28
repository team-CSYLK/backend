const { Users } = require('../models');

class UsersRepository {
  findUser = async (userId) => {
    const user = await Users.findByPk(userId);

    return user;
  };

  findNick = async (nickname) => {
    console.log(nickname);
    const nicknameEx = await Users.findOne({ where: { nickname } });

    console.log(nicknameEx);

    return nicknameEx;
  };

  createNickname = async (nickname, userId) => {
    const newNickname = await Users.update({ nickname }, { where: { userId } });

    return newNickname;
  };
}
module.exports = UsersRepository;
