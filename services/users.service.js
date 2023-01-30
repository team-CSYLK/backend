const {
  DuplicateDBDataError,
  ValidationError,
} = require('../exceptions/index.exception');
const UsersRepository = require('../repositories/users.repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UsersService {
  usersRepository = new UsersRepository();

  createNickname = async (nickname, userId) => {
    const user = await this.usersRepository.findUser(userId);

    const nicknameExist = await this.usersRepository.findNick(nickname);

    if (!user) {
      throw error;
    }

    if (nicknameExist) {
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
      const userId = userData.userId;
      const postData = await this.usersRepository.findByuserId(userId);
      const postIdAll = [];
      const postsImagesAll = [];
      const userPosts = [];

      for (let i = 0; i < postData.length; i++) {
        postIdAll.push(postData[i].postId);
        postsImagesAll.push(postData[i].imageUrl);
      }

      for (let i = 0; i < postData.length; i++) {
        userPosts.push({ id: postData[i].postId, image: postData[i].imageUrl });
      }

      const data = {
        nickname: userData.nickname,
        imageProfile: userData.imageProfile,
        postsCount: postData.length,
        postId: postIdAll,
        postsImage: postsImagesAll,
        userPosts: userPosts,
      };

      return data;
    } catch (err) {
      throw err;
    }
  };

  verifyUser = async (email, password) => {
    //로그인 요청이메일이 db에 존재하는지 확인
    const user = await this.usersRepository.findByEmail(email);

    //유저정보가 없다면 에러 있으면 userId변수에 할당
    let userId;
    if (!user) {
      throw new ValidationError('가입되지 않은 이메일 입니다.');
    } else {
      userId = user.userId;
    }

    //비밀번호 일치확인
    const passwordVerify = await bcrypt.compare(password, user.password);
    if (!passwordVerify) throw new ValidationError('비번이 틀렸어요.');

    /**accessToken 발급 */
    const accessToken = jwt.sign({ userId: userId }, process.env.SECRETKEY, {
      expiresIn: '60s',
    });

    /**refreshToken 발급 */
    const refreshToken = jwt.sign({ userId: userId }, process.env.SECRETKEY, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken, userId };
  };

  userCheck = async (email, name, imageProfile, snsId, provider) => {
    const exUser = await this.usersRepository.findKakaoUser(snsId);

    if (exUser) {
      return exUser;
    } else {
      const newUser = await this.usersRepository.createKakaoUser(
        email,
        name,
        imageProfile,
        snsId,
        provider
      );
      return newUser;
    }
  };
}
module.exports = UsersService;
