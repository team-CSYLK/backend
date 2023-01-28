const UsersRepository = require('../repositories/users.repository');

class UsersService {
  usersRepository = new UsersRepository();

  createNickname = async (nickname, userId) => {
    const user = await this.usersRepository.findUser(userId);

    console.log(user);

    if (!user) {
      throw error;
    }
    try {
      const newNickname = await this.usersRepository.createNickname(
        nickname,
        userId
      );

      return newNickname;
    } catch (err) {
      throw err;
    }
  };
}
module.exports = UsersService;
