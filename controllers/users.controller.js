const UsersService = require('../services/users.service');

class UsersController {
  usersService = new UsersService();

  userNickname = async (req, res) => {
    const { nickname } = req.body;
    const userId = res.locals.userId;

    await this.usersService.createNickname(nickname, userId);

    res.sendStatus(201);
  };

  userProfile = async (req, res) => {
    const { nickname } = req.params;

    const profile = await this.usersService.findUser(nickname);

    res.status(201).json({ statusCode: 201, data: profile });
  };
}

module.exports = UsersController;
