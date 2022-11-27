const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");
const logger = require("../utils/logger");

class AuthService {
  async verifyIdToken(idToken) {
    const client = new OAuth2Client(process.env.CLIENT_ID);

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      // [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });

    const payload = ticket.getPayload();
    return payload;
  }

  async register(name, avatar, email) {
    return User.create({ email, name, avatarUrl: avatar, role: "pending" });
  }

  async getToken(idToken) {
    let payload;
    try {
      payload = await this.verifyIdToken(idToken);
    } catch (err) {
      logger.error(err.message, { label: "Validate Google Token" });
      throw createHttpError(401, "Invalid Google token");
    }

    const { picture: avatar, email, name } = payload;

    let user = await User.findOne({ email });
    if (!user) user = await this.register(name, avatar, email);

    const token = jwt.sign(
      {
        name,
        avatar,
        email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return token;
  }

  async getUserByEmail(email) {
    return await User.findOne({ email }).exec();
  }

  async chooseRoleForEmail(role, email) {
    console.log(role, email);
    return await User.findOneAndUpdate({ email }, { role }, { new: true }).exec();
  }
}

module.exports = new AuthService();
