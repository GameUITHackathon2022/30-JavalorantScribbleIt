const status = require("http-status");
const authServce = require("../services/auth.service");

class authController {
  async login(req, res) {
    const { idToken } = req.body;

    const token = await authServce.getToken(idToken);

    res.status(status.OK).json({
      token,
    });
  }

  async getUser(req, res) {
    const { email } = req.body;
    const user = await authServce.getUserByEmail(email);
    res.status(status.OK).json({
      user,
    });
  }

  async chooseRole(req, res) {
    const { role, email } = req.body;
    const user = await authServce.chooseRoleForEmail(role, email);
    res.status(status.OK).json({
      user,
    });
  }
}

module.exports = new authController();
