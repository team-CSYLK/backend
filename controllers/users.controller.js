const UsersService = require('../services/users.service');

class UsersController {
  usersService = new UsersService();

  userNickname = async (req, res) => {
    const { nickname } = req.body;
    const userId = res.locals.userId;

    await this.usersService.createNickname(nickname, userId);

    res.sendStatus(201);
  };
}

module.exports = UsersController;
