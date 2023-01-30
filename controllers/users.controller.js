const UsersService = require('../services/users.service');
const joi = require('../util/joi');
const bcrypt = require('bcrypt');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const {
  InvalidParamsError,
  ValidationError,
} = require('../exceptions/index.exception');
require('dotenv').config();

class UsersController {
  usersService = new UsersService();

  userNickname = async (req, res) => {
    const { nickname } = req.body;
    const userId = res.locals.userId;

    const checkNickname = /^[a-zA-Z0-9]{3,}$/;

    if (!checkNickname.test(nickname)) {
      throw error;
    }

    const newNickname = await this.usersService.createNickname(
      nickname,
      userId
    );

    res
      .status(201)
      .json({ statusCode: 201, message: '닉네임이 변경되었습니다' });
  };

  userProfile = async (req, res) => {
    const { nickname } = req.params;

    const profile = await this.usersService.findUser(nickname);

    res.status(201).json({ statusCode: 201, data: profile });
  };

  userKakao = async (req, res) => {
    try {
      const { code } = req.body;
      const baseUrl = 'https://kauth.kakao.com/oauth/token';
      const config = {
        client_id: process.env.KAKAO_CLIENT_ID,
        grant_type: 'authorization_code',
        redirect_uri: process.env.KAKAO_CALLBACK,
        code: code,
      };
      const params = new URLSearchParams(config).toString();
      const finalUrl = `${baseUrl}?${params}`;
      const kakaoTokenRequest = await fetch(finalUrl, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json', // 이 부분을 명시하지않으면 text로 응답을 받게됨
        },
      });
      const json = await kakaoTokenRequest.json();
      const access_Token = await json.access_token;

      let user = await axios({
        method: 'get',
        url: 'https://kapi.kakao.com/v2/user/me',
        headers: {
          Authorization: `Bearer ${access_Token}`,
        }, //헤더에 내용을 보고 보내주겠다.
      });
      const email = user.data.kakao_account.email;
      const name = user.data.properties.nickname;
      const imageProfile = user.data.properties.profile_image;
      const snsId = user.data.id;
      const provider = 'kakao';

      const userData = await this.usersService.userCheck(
        email,
        name,
        imageProfile,
        snsId,
        provider
      );

      if (userData) {
        const accessToken = jwt.sign(
          { userId: userData.userId },
          process.env.SECRETKEY,
          {
            expiresIn: '1d',
          }
        );

        res.header('nickname', userData.nickname);
        res.header('Authorization', `Bearer ${accessToken}`);
        res.send(`nickname : ${userData.nickname}`); // 프론트엔드에 닉네임
      }
    } catch (err) {
      throw err.message;
    }
  };
}

module.exports = UsersController;
