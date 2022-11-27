const createHttpError = require("http-errors");

const Organization = require("../models/Organization");
const UserService = require("./user.service");
const logger = require("../utils/logger");
const checkId = require("../utils/check-id");

class OrganizationService {
  async getAll() {
    try {
      const organizations = await Organization.find().exec();
      return organizations;
    } catch (err) {
      logger.error(err, { label: "Organization" });
    }
  }

  async createOrganization(userId, organization) {
    try {
      const user = await UserService.getUserById(userId);
      user.role = "organization_member";
      organization.members = [];
      organization.members.push(user);
      const organizationResult = await Organization.create(organization);
      user.organization = organizationResult;
      user.save();
      return organizationResult;
    } catch (err) {
      logger.error(err, { label: "Organization" });
    }
  }

  async addFollower(userId, organizationId) {
    const organization = await Organization.findById(organizationId);
    const user = await UserService.getUserById(userId);
    if (organization.followers.includes(user._id)) {
      throw createHttpError(400, "You have followed.");
    }
    organization.followers.push(user._id);
    organization.save();
    user.followedOrganizations.push(organization._id);
    user.save();
    return organization;
  }

  async addMember(inviterUserId, invitedUserId, organizationId) {
    const organization = await Organization.findById(organizationId);

    if (!organization.members.includes(inviterUserId)) {
      throw createHttpError(400, "You are not a member of this organization.");
    }

    const user = await UserService.getUserById(invitedUserId);
    if (organization.members.includes(user._id)) {
      throw createHttpError(400, "You have joined");
    }
    organization.members.push(user._id);
    organization.save();
    user.role = "organization_member";
    user.organization = organization._id;
    user.save();
    return organization;
  }

  async getOneById(id) {
    return await Organization.findById(id).exec();
  }
}

module.exports = new OrganizationService();
