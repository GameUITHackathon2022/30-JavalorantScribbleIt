const express = require("express");

const eventController = require("../controllers/event.controller");
const catchAsync = require("../utils/catch-async");
const authenticateJwt = require("../utils/authenticate-jwt");

const eventRouter = express.Router();

eventRouter //
  .route("/:id")
  .get(catchAsync(eventController.getById))
  .put(authenticateJwt, catchAsync(eventController.updateEvent));

eventRouter //
  .route("/")
  .get(catchAsync(eventController.getAll))
  .post(authenticateJwt, catchAsync(eventController.createEvent));

eventRouter //
  .route("/comment")
  .get(catchAsync(eventController.getAllComment))
  .post(authenticateJwt, catchAsync(eventController.createComment));

eventRouter //
  .route("/join/:id")
  .post(authenticateJwt, catchAsync(eventController.joinEvent));

eventRouter //
  .route("/left/:id")
  .post(authenticateJwt, catchAsync(eventController.leftEvent));

eventRouter //
  .route("/insert-many")
  .post(authenticateJwt, catchAsync(eventController.insertMany));

module.exports = eventRouter;
