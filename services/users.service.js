const UsersRepository = require('../repositories/users.repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const error = new Error();
const success = {};
error.status = 400;

class UsersService {
  usersRepository = new UsersRepository();

  createNickname = async (nickname, userId) => {
    const user = await this.usersRepository.findUser(userId);
    const nicknameExist = await this.usersRepository.findNick(nickname);
    const checkNickname = /^[a-zA-Z0-9]{3,}$/;
    const checkedNickname = checkNickname.test(nickname);

    try {
      if (!checkedNickname) {
        error.status = 412;
        error.message = {
          statusCode: 412,
          errorMessage: '닉네임 형식을 확인하세요',
        };
        throw error;
      } else if (!user.userId) {
        error.status = 404;
        error.message = {
          statusCode: 404,
          errorMessage: '존재하지 않는 아이디입니다.',
        };
        throw error;
      } else if (nicknameExist) {
        error.status = 409;
        error.message = {
          statusCode: 409,
          errorMessage: '중복된 닉네임입니다.',
        };
        throw error;
      }

      const newNickname = await this.usersRepository.createNickname(
        nickname,
        userId
      );

      success.status = 200;
      success.message = { statusCode: 200, nickname: newNickname };
      return success;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  findUser = async (nickname) => {
    try {
      const userData = await this.usersRepository.findNick(nickname);

      if (!userData) {
        error.status = 404;
        error.message = {
          statusCode: 404,
          errorMessage: '존재하지 않는 회원입니다.',
        };
        throw error;
      }

      const userId = userData.userId;
      const postData = await this.usersRepository.findByuserId(userId);
      const userPosts = [];

      for (let i = 0; i < postData.length; i++) {
        userPosts.push({
          postid: postData[i].postId,
          image: postData[i].imageUrl,
        });
      }

      const data = {
        nickname: userData.nickname,
        imageProfile: userData.imageProfile,
        postsCount: postData.length,
        userPosts: userPosts,
      };

      success.status = 201;
      success.message = { statusCode: 201, data: data };
      return success;
    } catch (error) {
      console.log(error);
      return error;
    }
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

  setRefreshtoken = async (refreshToken, userId) => {
    const findToken = await this.usersRepository.findUserToken(userId);

    if (findToken) {
      const token = await this.usersRepository.updateToken(
        refreshToken,
        userId
      );
      return token;
    } else {
      const token = await this.usersRepository.createToken(
        refreshToken,
        userId
      );
      return token;
    }
  };

  getUserProfile = async (userId) => {
    const userData = await this.usersRepository.findUser(userId);

    try {
      if (!userData) {
        error.status = 404;
        error.message = {
          statusCode: 404,
          errorMessage: '존재하지 않는 회원입니다.',
        };
        throw error;
      }

      success.status = 201;
      success.message = {
        statusCode: 201,
        data: {
          name: userData.name,
          nickname: userData.nickname,
          introduce: userData.introduce,
          imageUrl: userData.imageProfile,
        },
      };
      return success;
    } catch (error) {
      return error;
    }
  };

  setUserProfile = async (userId, name, nickname, introduce, imageUrl) => {
    const checkNickname = /^[a-zA-Z0-9]{3,}$/;
    const checkedNickname = checkNickname.test(nickname);
    const nicknameExist = await this.usersRepository.findNick(nickname);

    try {
      if (!checkedNickname) {
        error.status = 412;
        error.message = {
          statusCode: 412,
          errorMessage: '닉네임 형식을 확인하세요',
        };
        throw error;
      } else if (nicknameExist) {
        error.status = 409;
        error.message = {
          statusCode: 409,
          errorMessage: '중복된 닉네임입니다.',
        };
        throw error;
      }

      const newData = await this.usersRepository.setUserProfile(
        userId,
        name,
        nickname,
        introduce,
        imageUrl
      );

      const userData = await this.usersRepository.findUser(userId);

      if (!userData) {
        error.status = 404;
        error.message = {
          statusCode: 404,
          errorMessage: '회원정보가 존재하지 않습니다.',
        };
        throw error;
      }

      success.status = 200;
      success.message = {
        statusCode: 200,
        data: {
          name: userData.name,
          nickname: userData.nickname,
          introduce: userData.introduce,
          imageUrl: userData.imageProfile,
        },
      };
      return success;
    } catch (error) {
      return error;
    }
  };
}
module.exports = UsersService;
