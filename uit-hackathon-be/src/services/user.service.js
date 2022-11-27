const createHttpError = require("http-errors");

const User = require("../models/User");
const logger = require("../utils/logger");
const checkId = require("../utils/check-id");

class UserService {
  async getUserById(id) {
    try {
      const user = User.findById(id).exec();
      return user;
    } catch (error) {
      logger.error(err, { label: "User" });
    }
  }
}

module.exports = new UserService();
