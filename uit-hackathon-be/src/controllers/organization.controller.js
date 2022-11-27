const status = require("http-status");

const organizationService = require("../services/organization.services");

class OrganizationController {
  async getAll(req, res) {
    const organizations = await organizationService.getAll();
    res.status(status.OK).json({
      organizations,
    });
  }

  async createOrganization(req, res) {
    const organization = await organizationService.createOrganization(
      req.body.userId,
      req.body.organization
    );
    return res.status(status.OK).json({
      organization,
    });
  }

  async addFollower(req, res) {
    const { organizationId } = req.body;
    const userId = req.user._id;
    const organization = await organizationService.addFollower(userId, organizationId);
    return res.status(status.OK).json({
      organization,
    });
  }

  async addMember(req, res) {
    const { invitedUserId, organizationId } = req.body;
    const inviterUserId = req.user._id;
    const organization = await organizationService.addMember(
      inviterUserId,
      invitedUserId,
      organizationId
    );
    return res.status(status.OK).json({
      organization,
    });
  }

  async getOne(req, res) {
    const { organizationId } = req.params;
    const organization = await organizationService.getOneById(organizationId);
    res.status(status.OK).json({
      organization,
    });
  }
}

module.exports = new OrganizationController();
