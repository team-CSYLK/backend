const { Users } = require('../models');

class UsersRepository {
  findUser = async (userId) => {
    const user = await Users.findByPk(userId);

    return user;
  };

  createNickname = async (nickname, userId) => {
    const newNickname = await Users.update({ nickname }, { where: { userId } });

    return newNickname;
  };
}
module.exports = UsersRepository;
