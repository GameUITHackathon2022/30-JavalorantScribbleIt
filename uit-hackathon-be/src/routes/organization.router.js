const express = require("express");

const organizationController = require("../controllers/organization.controller");
const authenticateJwt = require("../utils/authenticate-jwt");
const catchAsync = require("../utils/catch-async");

const organizationRouter = express.Router();

organizationRouter //
  .route("/")
  .get(catchAsync(organizationController.getAll))
  .post(authenticateJwt, catchAsync(organizationController.createOrganization));

organizationRouter //
  .route("/member")
  .patch(authenticateJwt, catchAsync(organizationController.addMember));

organizationRouter //
  .route("/follower")
  .patch(authenticateJwt, catchAsync(organizationController.addFollower));

organizationRouter //
  .route("/:organizationId")
  .get(catchAsync(organizationController.getOne));

module.exports = organizationRouter;
