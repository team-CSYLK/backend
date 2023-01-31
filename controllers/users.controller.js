const UsersService = require('../services/users.service');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const aws = require('aws-sdk');
require('dotenv').config();

class UsersController {
  usersService = new UsersService();

  userNickname = async (req, res) => {
    const { nickname } = req.body;
    const userId = res.locals.userId;

    const newNickname = await this.usersService.createNickname(
      nickname,
      userId
    );

    return res.status(newNickname.status || 400).json(newNickname.message);
  };

  userProfile = async (req, res) => {
    const { nickname } = req.params;

    const profile = await this.usersService.findUser(nickname);

    res.status(profile.status || 400).json(profile.message);
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

      const userId = userData.userId;

      if (userData) {
        const accessToken = jwt.sign(
          { userId: userId },
          process.env.SECRETKEY,
          {
            expiresIn: '1d',
          }
        );
        const refreshToken = jwt.sign(
          { userId: userId },
          process.env.SECRETKEY,
          {
            expiresIn: '5d',
          }
        );

        await this.usersService.setRefreshtoken(refreshToken, userId);

        res.header(userData.nickname);
        res.header('Authorization', `Bearer ${accessToken}`);
        res.send(userData.nickname); // 프론트엔드에 닉네임
        return;
      }
    } catch (error) {
      throw error;
    }
  };

  getUserProfile = async (req, res) => {
    const userId = res.locals.userId;
    const userData = await this.usersService.getUserProfile(userId);

    res.status(userData.status || 400).json(userData.message);
  };

  setUserProfile = async (req, res) => {
    const userId = res.locals.userId;
    const { name, nickname, introduce } = req.body;
    const imageProfile = req.files[0].transforms[0].location;

    const setData = await this.usersService.setUserProfile(
      userId,
      name,
      nickname,
      introduce,
      imageProfile
    );

    res.status(setData.status || 400).json(setData.message);
  };
}

module.exports = UsersController;
