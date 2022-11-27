const express = require("express");

const authController = require("../controllers/auth.controller");
const catchAsync = require("../utils/catch-async");

const authRouter = express.Router();

authRouter //
  .post("/login", catchAsync(authController.login));

authRouter //
  .post("/get-user", catchAsync(authController.getUser));

authRouter //
  .post("/choose-role", catchAsync(authController.chooseRole));

module.exports = authRouter;
