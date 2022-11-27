const express = require("express");

const fileController = require("../controllers/file.controller");
const authenticateJwt = require("../utils/authenticate-jwt");
const catchAsync = require("../utils/catch-async");
const upload = require("../utils/upload");

const fileRouter = express.Router();

fileRouter //
  .post("/upload", authenticateJwt, upload.single("image"), catchAsync(fileController.uploadImage));

fileRouter //
  .get("/image/:id", catchAsync(fileController.getImage));

module.exports = fileRouter;
