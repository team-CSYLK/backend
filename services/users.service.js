const UsersRepository = require('../repositories/users.repository');

class UsersService {
  usersRepository = new UsersRepository();

  createNickname = async (nickname, userId) => {
    const user = await this.usersRepository.findUser(userId);

    const nicknameExist = await this.usersRepository.findNick(nickname);

    if (nicknameExist) {
      throw error;
    }

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

  findUser = async (nickname) => {
    try {
      const userData = await this.usersRepository.findNick(nickname);
      const data = {
        nickname: userData.nickname,
        imageProfile: userData.imageProfile,
        postsCount: 0,
        postId: [],
        postsImage: [],
      };

      return data;
    } catch (err) {
      throw err;
    }
  };
}
module.exports = UsersService;
